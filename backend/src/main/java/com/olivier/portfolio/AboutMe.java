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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> stack;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> hobbies;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> goals;
}
