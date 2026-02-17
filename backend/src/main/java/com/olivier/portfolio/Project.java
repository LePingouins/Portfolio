
package com.olivier.portfolio;

import jakarta.persistence.*;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String projectLink;
    private String websiteLink;
    
    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @ElementCollection
    private java.util.List<String> techStack;

    private Boolean archived = false;

    public Project() {}

    public Project(Long id, String name, String description, String projectLink, String websiteLink, String imageUrl, java.util.List<String> techStack, Boolean archived) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.projectLink = projectLink;
        this.websiteLink = websiteLink;
        this.imageUrl = imageUrl;
        this.techStack = techStack;
        this.archived = archived;
    }
    public Boolean getArchived() { return archived; }
    public void setArchived(Boolean archived) { this.archived = archived; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getProjectLink() { return projectLink; }
    public void setProjectLink(String projectLink) { this.projectLink = projectLink; }

    public String getWebsiteLink() { return websiteLink; }
    public void setWebsiteLink(String websiteLink) { this.websiteLink = websiteLink; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public java.util.List<String> getTechStack() { return techStack; }
    public void setTechStack(java.util.List<String> techStack) { this.techStack = techStack; }
}
