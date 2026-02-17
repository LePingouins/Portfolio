package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackRepository feedbackRepository;

    private final Map<String, Instant> rateLimitMap = new ConcurrentHashMap<>();
    private static final long RATE_LIMIT_MINUTES = 10;

    // For admin: get all feedbacks (not archived)
    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findByArchived(false);
    }

    // For user: get only accepted feedbacks (not archived)
    @GetMapping("/accepted")
    public List<Feedback> getAcceptedFeedback() {
        return feedbackRepository.findByStatusAndArchived("ACCEPTED", false);
    }

    // For admin: get all archived feedbacks
    @GetMapping("/archived")
    public List<Feedback> getArchivedFeedback() {
        return feedbackRepository.findByArchived(true);
    }

    // Accept a feedback (admin)
    @PatchMapping("/{id}/accept")
    public Feedback acceptFeedback(@PathVariable Long id) {
        Feedback fb = feedbackRepository.findById(id).orElseThrow();
        fb.setStatus("ACCEPTED");
        return feedbackRepository.save(fb);
    }

    // Reject a feedback (admin)
    @PatchMapping("/{id}/reject")
    public Feedback rejectFeedback(@PathVariable Long id) {
        Feedback fb = feedbackRepository.findById(id).orElseThrow();
        fb.setStatus("REJECTED");
        return feedbackRepository.save(fb);
    }

    // Archive a feedback (admin)
    @PatchMapping("/{id}/archive")
    public Feedback archiveFeedback(@PathVariable Long id) {
        Feedback fb = feedbackRepository.findById(id).orElseThrow();
        fb.setArchived(true);
        return feedbackRepository.save(fb);
    }

    // Unarchive a feedback (admin)
    @PatchMapping("/{id}/unarchive")
    public Feedback unarchiveFeedback(@PathVariable Long id) {
        Feedback fb = feedbackRepository.findById(id).orElseThrow();
        fb.setArchived(false);
        return feedbackRepository.save(fb);
    }

    // Delete a feedback (admin)
    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackRepository.deleteById(id);
    }

    // User submits feedback (status defaults to PENDING) with rate limiting (10 mins)
    @PostMapping
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback, HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        // Check for X-Forwarded-For if behind Load Balancer/Proxy (like Render)
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            clientIp = xForwardedFor.split(",")[0].trim();
        }

        Instant now = Instant.now();
        Instant lastRequest = rateLimitMap.get(clientIp);

        if (lastRequest != null && lastRequest.isAfter(now.minus(RATE_LIMIT_MINUTES, ChronoUnit.MINUTES))) {
            long remainingMinutes = ChronoUnit.MINUTES.between(now, lastRequest.plus(RATE_LIMIT_MINUTES, ChronoUnit.MINUTES)) + 1;
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body("You can only submit feedback once every " + RATE_LIMIT_MINUTES + " minutes. Please wait " + remainingMinutes + " minute(s).");
        }

        rateLimitMap.put(clientIp, now);

        // Periodically cleanup map to prevent memory leak (simple approach: remove if older than limit)
        if (rateLimitMap.size() > 1000) {
             rateLimitMap.entrySet().removeIf(entry -> 
                entry.getValue().isBefore(now.minus(RATE_LIMIT_MINUTES * 2, ChronoUnit.MINUTES)));
        }

        feedback.setStatus("PENDING");
        Feedback saved = feedbackRepository.save(feedback);
        return ResponseEntity.ok(saved);
    }
}
