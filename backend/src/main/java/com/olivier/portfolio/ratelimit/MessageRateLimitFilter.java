package com.olivier.portfolio.ratelimit;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class MessageRateLimitFilter extends OncePerRequestFilter {

    private final RateLimitService rl;

    public MessageRateLimitFilter(RateLimitService rl) { this.rl = rl; }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
        String path = req.getRequestURI();
        // Only apply to contact endpoints
        if (!("/api/contact-messages".equals(path) || "/api/messages".equals(path)) || !"POST".equalsIgnoreCase(req.getMethod())) {
            chain.doFilter(req, res);
            return;
        }

        String ip = extractClientIp(req);
        String userId = req.getUserPrincipal() != null ? req.getUserPrincipal().getName() : null;
        String fingerprint = req.getHeader("X-Device-Fingerprint");
        String sessionId = null;
        if (req.getCookies() != null) {
            for (Cookie c : req.getCookies()) {
                if ("SID".equals(c.getName())) { sessionId = c.getValue(); break; }
            }
        }

        RateLimitService.Decision decision = rl.evaluate(userId, ip, fingerprint, sessionId);
        switch (decision.action) {
            case ALLOW:
                chain.doFilter(req, res);
                return;
            case REQUIRE_CAPTCHA:
                res.setStatus(403);
                res.setHeader("X-Require-Captcha", "1");
                res.getWriter().write("CAPTCHA required");
                return;
            case TEMP_BAN:
                res.setStatus(403);
                res.getWriter().write("Temporarily banned");
                return;
            default:
                res.setStatus(429);
                res.getWriter().write("Rate limit exceeded");
                return;
        }
    }

    private String extractClientIp(HttpServletRequest req) {
        String xff = req.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) return xff.split(",")[0].trim();
        return req.getRemoteAddr();
    }
}
