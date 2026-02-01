package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {
    @Autowired
    private TestimonialRepository testimonialRepo;

    @GetMapping
    public List<Testimonial> getApproved() {
        return testimonialRepo.findByApprovedTrue();
    }

    @GetMapping("/all")
    public List<Testimonial> getAll() {
        return testimonialRepo.findAll();
    }

    @PostMapping
    public Testimonial create(@RequestBody Testimonial t) {
        t.setApproved(false); // New testimonials are not approved by default
        return testimonialRepo.save(t);
    }

    @PutMapping("/{id}/approve")
    public Testimonial approve(@PathVariable Long id) {
        Testimonial t = testimonialRepo.findById(id).orElseThrow();
        t.setApproved(true);
        return testimonialRepo.save(t);
    }

    @PutMapping("/{id}/reject")
    public Testimonial reject(@PathVariable Long id) {
        Testimonial t = testimonialRepo.findById(id).orElseThrow();
        t.setApproved(false);
        return testimonialRepo.save(t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        testimonialRepo.deleteById(id);
    }
}
