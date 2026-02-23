package com.olivier.portfolio.ratelimit;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RateLimitConfig {

    @Bean
    public FilterRegistrationBean<MessageRateLimitFilter> messageRateLimitFilter(RateLimitService rl) {
        FilterRegistrationBean<MessageRateLimitFilter> reg = new FilterRegistrationBean<>();
        reg.setFilter(new MessageRateLimitFilter(rl));
        reg.addUrlPatterns("/api/contact-messages", "/api/messages");
        reg.setName("MessageRateLimitFilter");
        reg.setOrder(10);
        return reg;
    }
}
