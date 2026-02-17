package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {
    @Autowired
    private ContactMessageRepository messageRepo;

    private final Map<String, Instant> rateLimitMap = new ConcurrentHashMap<>();
    private static final long RATE_LIMIT_MINUTES = 10;

    @GetMapping
    public List<ContactMessage> getAll() {
        return messageRepo.findByArchived(false);
    }

    @GetMapping("/archived")
    public List<ContactMessage> getArchived() {
        return messageRepo.findByArchived(true);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ContactMessage message, HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            clientIp = xForwardedFor.split(",")[0].trim();
        }

        Instant now = Instant.now();
        Instant lastRequest = rateLimitMap.get(clientIp);

        if (lastRequest != null && lastRequest.isAfter(now.minus(RATE_LIMIT_MINUTES, ChronoUnit.MINUTES))) {
            long remainingMinutes = ChronoUnit.MINUTES.between(now, lastRequest.plus(RATE_LIMIT_MINUTES, ChronoUnit.MINUTES)) + 1;
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body("You can only send a message once every " + RATE_LIMIT_MINUTES + " minutes. Please wait " + remainingMinutes + " minute(s).");
        }

        // Periodically cleanup map to prevent memory leak (simple approach: remove if older than limit)
        if (rateLimitMap.size() > 1000) {
             rateLimitMap.entrySet().removeIf(entry -> 
                entry.getValue().isBefore(now.minus(RATE_LIMIT_MINUTES * 2, ChronoUnit.MINUTES)));
        }

        rateLimitMap.put(clientIp, now);
        return ResponseEntity.ok(messageRepo.save(message));
    }

    @PatchMapping("/{id}/archive")
    public ContactMessage archive(@PathVariable Long id) {
        ContactMessage msg = messageRepo.findById(id).orElseThrow();
        msg.setArchived(true);
        return messageRepo.save(msg);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        messageRepo.deleteById(id);
    }
}
