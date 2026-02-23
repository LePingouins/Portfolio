package com.olivier.portfolio.ratelimit;

import org.junit.jupiter.api.Test;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.utility.DockerImageName;

import static org.junit.jupiter.api.Assertions.*;

public class RateLimitIntegrationTest {

    @Test
    public void ipTokenBucket_enforcedByLuaScript() throws Exception {
        DockerImageName img = DockerImageName.parse("redis:7");
        GenericContainer<?> redis = new GenericContainer<>(img).withExposedPorts(6379);
        try {
            redis.start();
            String host = redis.getHost();
            Integer port = redis.getMappedPort(6379);

            RedisStandaloneConfiguration cfg = new RedisStandaloneConfiguration(host, port);
            LettuceConnectionFactory lcf = new LettuceConnectionFactory(cfg);
            lcf.afterPropertiesSet();

            StringRedisTemplate tpl = new StringRedisTemplate(lcf);
            tpl.afterPropertiesSet();

            RateLimitService svc = new RateLimitService(tpl);
            String ip = "203.0.113.5";
            boolean seenBlocked = false;

            // ip capacity is 10 tokens; 11+ immediate requests should trigger block
            for (int i = 0; i < 12; i++) {
                RateLimitService.Decision d = svc.evaluate(null, ip, null, null);
                if (d.action != RateLimitService.Action.ALLOW) seenBlocked = true;
            }

            assertTrue(seenBlocked, "Expected at least one request to be blocked by the token-bucket");
            // verify a violation counter exists
            String viol = tpl.opsForValue().get("viol:ip:" + ip);
            assertNotNull(viol, "Expected a violation counter for the IP");

        } finally {
            try { redis.stop(); } catch (Exception ignored) {}
        }
    }
}
