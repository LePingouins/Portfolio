package com.olivier.portfolio;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String text;
    private String role;
    private String avatar;
    private boolean approved = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Testimonial() {}
    public Testimonial(String name, String text, String role, String avatar) {
        this.name = name;
        this.text = text;
        this.role = role;
        this.avatar = avatar;
        this.createdAt = LocalDateTime.now();
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
