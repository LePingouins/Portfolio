package com.olivier.portfolio;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class AboutMe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String language; // "en" or "fr"

    @Column(columnDefinition = "TEXT")
    private String text;

    @ElementCollection
    private List<String> stack;

    @ElementCollection
    private List<String> hobbies;

    @ElementCollection
    private List<String> goals;
}
