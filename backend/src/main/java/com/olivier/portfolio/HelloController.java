package com.olivier.portfolio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String root() {
        return "Backend is running!!";
    }

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from the backend!";
    }
}
