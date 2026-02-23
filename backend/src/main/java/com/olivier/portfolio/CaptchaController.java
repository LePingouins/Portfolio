package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CaptchaController {

    private final StringRedisTemplate redis;

    @Value("${CLOUDFLARE_TURNSTILE_SECRET:}")
    private String turnstileSecret;

    @Value("${RECAPTCHA_SECRET:}")
    private String recaptchaSecret;

    public CaptchaController(StringRedisTemplate redis) { this.redis = redis; }

    @PostMapping("/verify-captcha")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String userId = body.get("userId");
        if (!StringUtils.hasText(token)) return ResponseEntity.badRequest().body(Map.of("ok", false));

        boolean ok = false;
        
        // Prioritize Turnstile if configured
        if (StringUtils.hasText(turnstileSecret)) {
             try {
                RestTemplate rt = new RestTemplate();
                // Cloudflare Turnstile verify endpoint
                String url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
                
                // Must send as form data or json
                Map<String, String> payload = Map.of("secret", turnstileSecret, "response", token);
                @SuppressWarnings("unchecked")
                Map<String, Object> resp = (Map<String, Object>) rt.postForObject(url, payload, Map.class);
                
                if (resp != null && Boolean.TRUE.equals(resp.get("success"))) ok = true;
             } catch (Exception ex) {
                 // log.error("Turnstile verification failed", ex);
             }
        } else if (!StringUtils.hasText(recaptchaSecret)) {
            // No secret configured: accept a special local token for development
            ok = "local-test".equals(token);
        } else {
            // Fallback to ReCaptcha
            try {
                RestTemplate rt = new RestTemplate();
                String url = "https://www.google.com/recaptcha/api/siteverify?secret=" + recaptchaSecret + "&response=" + token;
                @SuppressWarnings("unchecked")
                Map<String, Object> resp = (Map<String, Object>) rt.postForObject(url, null, Map.class);
                if (resp != null && Boolean.TRUE.equals(resp.get("success"))) ok = true;
            } catch (Exception ignored) {}
        }

        if (ok && StringUtils.hasText(userId) && redis != null) {
            try {
                redis.delete("captcha:acct:" + userId);
                redis.delete("viol:acct:" + userId);
            } catch (Exception ignored) {}
        }
        return ResponseEntity.ok(Map.of("ok", ok));
    }
}
