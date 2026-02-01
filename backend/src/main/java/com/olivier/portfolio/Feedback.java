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

    public Feedback() {}
    public Feedback(String name, String comment) {
        this.name = name;
        this.comment = comment;
        this.createdAt = LocalDateTime.now();
    }
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
