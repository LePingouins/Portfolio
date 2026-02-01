package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {
    @Autowired
    private EducationRepository educationRepo;

    @GetMapping
    public List<Education> getAll() {
        return educationRepo.findAll();
    }

    @PostMapping
    public Education create(@RequestBody Education edu) {
        return educationRepo.save(edu);
    }

    @PutMapping("/{id}")
    public Education update(@PathVariable Long id, @RequestBody Education edu) {
        edu.setId(id);
        return educationRepo.save(edu);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        educationRepo.deleteById(id);
    }
}
