package com.olivier.portfolio;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;

@RestController
public class HelloController {

    private final DataSource dataSource;

    public HelloController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/")
    public String root() {
        return "Backend is running!!";
    }

    @GetMapping("/api/hello")
    public ResponseEntity<String> hello() {
        try (Connection conn = dataSource.getConnection();
             var stmt = conn.createStatement()) {
            stmt.execute("SELECT 1");
            return ResponseEntity.ok("Hello from the backend!");
        } catch (Exception e) {
            return ResponseEntity.status(503).body("Database not ready");
        }
    }
}
