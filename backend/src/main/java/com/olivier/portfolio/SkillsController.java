package com.olivier.portfolio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillsController {
    @Autowired
    private SkillRepository skillRepo;

    @GetMapping
    public List<Skill> getSkills() {
        return skillRepo.findAll();
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillRepo.save(skill);
    }

    @DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillRepo.deleteById(id);
    }
}
