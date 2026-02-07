package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackRepository feedbackRepository;

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

    // User submits feedback (status defaults to PENDING)
    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        feedback.setStatus("PENDING");
        return feedbackRepository.save(feedback);
    }
}
