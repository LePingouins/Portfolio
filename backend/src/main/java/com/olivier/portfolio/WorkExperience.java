package com.olivier.portfolio;

import jakarta.persistence.*;

@Entity
@Table(name = "work_experience")
public class WorkExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String company;
    private String period;
    private String location;

    @ElementCollection
    @CollectionTable(name = "work_experience_responsibilities", joinColumns = @JoinColumn(name = "work_experience_id"))
    @Column(name = "responsibility")
    private java.util.List<String> responsibilities;

    public WorkExperience() {}

    public WorkExperience(String title, String company, String period, String location, java.util.List<String> responsibilities) {
        this.title = title;
        this.company = company;
        this.period = period;
        this.location = location;
        this.responsibilities = responsibilities;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public java.util.List<String> getResponsibilities() { return responsibilities; }
    public void setResponsibilities(java.util.List<String> responsibilities) { this.responsibilities = responsibilities; }
}
