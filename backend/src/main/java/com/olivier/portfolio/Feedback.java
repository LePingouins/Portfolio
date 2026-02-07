package com.olivier.portfolio;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String status = "PENDING";
    private boolean archived = false;

    public Feedback() {}
    public Feedback(String name, String comment) {
        this.name = name;
        this.comment = comment;
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
        this.archived = false;
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public boolean isArchived() { return archived; }
    public void setArchived(boolean archived) { this.archived = archived; }
}
