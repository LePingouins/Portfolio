package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AdminUserRepository adminRepo;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        AdminUser user = adminRepo.findByUsername(username).orElse(null);
        if (user == null || !encoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }
        // For demo: return a fake token. Replace with JWT in production.
        return Map.of("token", "demo-token", "username", user.getUsername());
    }

    @PostMapping("/register")
    public AdminUser register(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String hash = encoder.encode(password);
        AdminUser user = new AdminUser(username, hash);
        return adminRepo.save(user);
    }
}
