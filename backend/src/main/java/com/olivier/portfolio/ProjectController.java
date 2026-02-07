package com.olivier.portfolio;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepo;

    @GetMapping
    public List<Project> getProjects() {
        return projectRepo.findAll().stream()
            .filter(p -> p.getArchived() == null || !p.getArchived())
            .collect(Collectors.toList());
    }

    @GetMapping("/archived")
    public List<Project> getArchivedProjects() {
        return projectRepo.findAll().stream()
            .filter(p -> p.getArchived() != null && p.getArchived())
            .collect(Collectors.toList());
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

    @PatchMapping("/{id}/archive")
    public Project archiveProject(@PathVariable Long id) {
        Project project = projectRepo.findById(id).orElseThrow();
        project.setArchived(true);
        return projectRepo.save(project);
    }

    @PatchMapping("/{id}/unarchive")
    public Project unarchiveProject(@PathVariable Long id) {
        Project project = projectRepo.findById(id).orElseThrow();
        project.setArchived(false);
        return projectRepo.save(project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {
        projectRepo.deleteById(id);
    }
}
