package com.olivier.portfolio.ratelimit;

import org.junit.jupiter.api.Test;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class RateLimitServiceTest {

    @Test
    public void shouldRequireCaptcha_after3Violations() throws Exception {
        StringRedisTemplate redis = mock(StringRedisTemplate.class);
        @SuppressWarnings("unchecked")
        ValueOperations<String, String> vops = mock(ValueOperations.class);
        when(redis.opsForValue()).thenReturn(vops);
        when(redis.opsForValue()).thenReturn(vops);
        when(vops.get("viol:acct:test")).thenReturn("3");
        RateLimitService svc = new RateLimitService(redis);
        assertTrue(svc.shouldRequireCaptcha("viol:acct:test"));
    }

    @Test
    public void handleViolation_incrementsAndSetsExpiry() throws Exception {
        StringRedisTemplate redis = mock(StringRedisTemplate.class);
        @SuppressWarnings("unchecked")
        ValueOperations<String, String> vops = mock(ValueOperations.class);
        when(redis.opsForValue()).thenReturn(vops);

        RateLimitService svc = new RateLimitService(redis);
        svc.handleViolation("viol:acct:abc");

        verify(vops).increment("viol:acct:abc");
        verify(redis).expire("viol:acct:abc", Duration.ofHours(1));
    }
}
