package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/work")
public class WorkExperienceController {
    @Autowired
    private WorkExperienceRepository workRepo;

    @GetMapping
    public List<WorkExperience> getAll() {
        return workRepo.findAll();
    }

    @PostMapping
    public WorkExperience create(@RequestBody WorkExperience work) {
        return workRepo.save(work);
    }

    @PutMapping("/{id}")
    public WorkExperience update(@PathVariable Long id, @RequestBody WorkExperience work) {
        work.setId(id);
        return workRepo.save(work);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        workRepo.deleteById(id);
    }
}
