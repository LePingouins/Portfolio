package com.olivier.portfolio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepo;

    @GetMapping
    public List<Project> getProjects() {
        return projectRepo.findAll();
    }

    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return projectRepo.save(project);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        project.setId(id);
        return projectRepo.save(project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepo.deleteById(id);
    }
}
