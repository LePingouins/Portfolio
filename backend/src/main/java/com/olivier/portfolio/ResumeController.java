package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {
    @Autowired
    private ResumeRepository resumeRepo;

    @GetMapping
    public List<Resume> getAll() {
        return resumeRepo.findAll();
    }

    @PostMapping
    public Resume create(@RequestBody Resume resume) {
        return resumeRepo.save(resume);
    }

    @PutMapping("/{id}")
    public Resume update(@PathVariable Long id, @RequestBody Resume resume) {
        resume.setId(id);
        return resumeRepo.save(resume);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        resumeRepo.deleteById(id);
    }
}
