package com.olivier.portfolio.ratelimit;

import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class RateLimitService {

    private final StringRedisTemplate redis;
    private final String tokenScriptText;

    public enum Action { ALLOW, BLOCK_AND_COUNT, REQUIRE_CAPTCHA, TEMP_BAN }

    public static class Decision {
        public final Action action;
        public final String reason;
        public final double remainingTokens;
        public Decision(Action action, String reason, double remainingTokens) {
            this.action = action; this.reason = reason; this.remainingTokens = remainingTokens;
        }
    }

    public RateLimitService(StringRedisTemplate redis) throws Exception {
        this.redis = redis;
        byte[] bytes = new ClassPathResource("token_bucket.lua").getInputStream().readAllBytes();
        this.tokenScriptText = new String(bytes, StandardCharsets.UTF_8);
    }

    private long nowMs() { return Instant.now().toEpochMilli(); }

    private Decision checkTokenBucket(String key, double capacity, double refillPerSec, double consume, long ttlMs) {
        try {
            double refillPerMs = refillPerSec / 1000.0;
            List<String> res = evalLua(tokenScriptText, key,
                    String.valueOf(nowMs()), String.valueOf(capacity), String.valueOf(refillPerMs),
                    String.valueOf(consume), String.valueOf(ttlMs));
            if (res != null && res.size() >= 2) {
                long allowed = Long.parseLong(res.get(0));
                double tokens = Double.parseDouble(res.get(1));
                return allowed == 1 ? new Decision(Action.ALLOW, "ok", tokens) : new Decision(Action.BLOCK_AND_COUNT, "rate_limit", tokens);
            }
        } catch (Exception ex) {
            // on failure, be permissive
        }
        return new Decision(Action.BLOCK_AND_COUNT, "error", 0);
    }

    public Decision evaluate(String userId, String ip, String fingerprint, String sessionId) {
        try {
            if (userId != null) {
                if (hasKey("ban:acct:" + userId)) return new Decision(Action.TEMP_BAN, "user_banned", 0);
            }

            double consume = 1.0;

            if (userId != null) {
                Decision d = checkTokenBucket("rl:user:" + userId, 2.0, 1.0/600.0, consume, 24*3600*1000);
                if (d.action != Action.ALLOW) {
                    handleViolation("viol:acct:" + userId);
                    if (shouldRequireCaptcha("viol:acct:" + userId)) return new Decision(Action.REQUIRE_CAPTCHA, "captcha_needed", d.remainingTokens);
                    escalateBanIfNeeded("viol:acct:" + userId, userId);
                    return d;
                }
            }

            if (fingerprint != null) {
                Decision d = checkTokenBucket("rl:fp:" + fingerprint, 3.0, 1.0/1800.0, consume, 24*3600*1000);
                if (d.action != Action.ALLOW) {
                    handleViolation("viol:fp:" + fingerprint);
                    if (shouldRequireCaptcha("viol:fp:" + fingerprint)) return new Decision(Action.REQUIRE_CAPTCHA, "captcha_fp", d.remainingTokens);
                    return d;
                }
            }

            if (sessionId != null) {
                Decision d = checkTokenBucket("rl:session:" + sessionId, 3.0, 1.0/1800.0, consume, 24*3600*1000);
                if (d.action != Action.ALLOW) {
                    handleViolation("viol:session:" + sessionId);
                    return d;
                }
            }

            if (ip != null) {
                Decision d = checkTokenBucket("rl:ip:" + ip, 10.0, 1.0/300.0, consume, 60*60*1000);
                if (d.action != Action.ALLOW) {
                    handleViolation("viol:ip:" + ip);
                    if (shouldRequireCaptcha("viol:ip:" + ip)) return new Decision(Action.REQUIRE_CAPTCHA, "captcha_ip", d.remainingTokens);
                    return d;
                }
                // sliding window burst detection
                long now = nowMs();
                String sw = "sw:ip:" + ip;
                zadd(sw, String.valueOf(now), (double) now);
                zremrangebyscore(sw, 0, now - 60_000);
                Long cnt = zcount(sw, now - 60_000, now);
                if (cnt != null && cnt > 40) {
                    handleViolation("viol:ip:" + ip);
                    return new Decision(Action.BLOCK_AND_COUNT, "burst_detected", 0);
                }
            }
        } catch (Exception ex) {
            // on error be permissive
        }
        return new Decision(Action.ALLOW, "ok", 0);
    }

    void handleViolation(String key) {
        try {
            opsIncr(key);
            expire(key, Duration.ofHours(1));
        } catch (Exception ignored) {}
    }

    boolean shouldRequireCaptcha(String violKey) {
        try {
            String val = opsGet(violKey);
            if (val == null) return false;
            long v = Long.parseLong(val);
            return v >= 3;
        } catch (Exception ex) { return false; }
    }

    private void escalateBanIfNeeded(String violKey, String userId) {
        try {
            String val = opsGet(violKey);
            long v = val == null ? 0 : Long.parseLong(val);
            if (v >= 6 && userId != null) {
                long banMinutes = 15;
                if (v >= 12) banMinutes = 60;
                if (v >= 30) banMinutes = 6*60;
                opsSetEx("ban:acct:" + userId, "1", Duration.ofMinutes(banMinutes));
            }
        } catch (Exception ignored) {}
    }

    // --- Typed Redis helpers ---
    private boolean hasKey(String key) {
        try { return redis != null && Boolean.TRUE.equals(redis.hasKey(key)); } catch (Exception ex) { return false; }
    }

    @SuppressWarnings({"unchecked","rawtypes"})
    private List<String> evalLua(String scriptText, String key, String... argv) {
        try {
            DefaultRedisScript<List> script = new DefaultRedisScript<>();
            script.setScriptText(scriptText);
            script.setResultType(List.class);
            List<String> keys = Collections.singletonList(key);
            Object raw = redis.execute(script, keys, (Object[]) argv);
            if (raw == null) return null;
            List<String> out = new ArrayList<>();
            if (raw instanceof java.util.List) {
                for (Object o : (java.util.List<?>) raw) {
                    if (o instanceof byte[]) out.add(new String((byte[]) o, StandardCharsets.UTF_8));
                    else out.add(String.valueOf(o));
                }
            } else {
                out.add(String.valueOf(raw));
            }
            return out;
        } catch (Exception ex) {
            return null;
        }
    }

    private void zadd(String key, String value, double score) {
        try { ZSetOperations<String, String> zops = redis.opsForZSet(); zops.add(key, value, score); } catch (Exception ignored) {}
    }

    private void zremrangebyscore(String key, double min, double max) {
        try { ZSetOperations<String, String> zops = redis.opsForZSet(); zops.removeRangeByScore(key, min, max); } catch (Exception ignored) {}
    }

    private Long zcount(String key, double min, double max) {
        try { ZSetOperations<String, String> zops = redis.opsForZSet(); Long c = zops.count(key, min, max); return c; } catch (Exception ex) { return null; }
    }

    private void opsIncr(String key) {
        try { ValueOperations<String, String> vops = redis.opsForValue(); vops.increment(key); } catch (Exception ignored) {}
    }

    private String opsGet(String key) {
        try { ValueOperations<String, String> vops = redis.opsForValue(); return vops.get(key); } catch (Exception ex) { return null; }
    }

    private void opsSetEx(String key, String value, Duration ttl) {
        try { ValueOperations<String, String> vops = redis.opsForValue(); vops.set(key, value, ttl); } catch (Exception ignored) {}
    }

    private void expire(String key, Duration ttl) {
        try { redis.expire(key, ttl); } catch (Exception ignored) {}
    }
}
