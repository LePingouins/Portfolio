package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminPortfolioController {
    @Autowired private SkillsController skillsController;
    @Autowired private ProjectController projectController;

    // Skills
    @PostMapping("/skills")
    public Object addSkill(@RequestBody String skillName) {
        Skill skill = new Skill();
        skill.setName(skillName);
        return skillsController.addSkill(skill);
    }
    @DeleteMapping("/skills/{skill}")
    public void deleteSkill(@PathVariable String skillId) {
        try {
            Long id = Long.parseLong(skillId);
            skillsController.deleteSkill(id);
        } catch (NumberFormatException e) {
            // Optionally log or handle error
        }
    }

    // Projects
    @PostMapping("/projects")
    public Object addProject(@RequestBody Project p) { return projectController.addProject(p); }
    @PutMapping("/projects/{id}")
    public Object updateProject(@PathVariable Long id, @RequestBody Project p) { return projectController.updateProject(id, p); }
    @DeleteMapping("/projects/{id}")
    public void deleteProject(@PathVariable Long id) { projectController.deleteProject(id); }

    // Work Experience, Education, Resume, Hobbies, Contact Info, Testimonials, Messages
    // All CRUD is already exposed via their respective controllers (POST/PUT/DELETE)
    // Optionally, you can add admin-specific endpoints here for batch operations or extra security
}
