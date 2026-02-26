package com.olivier.portfolio;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String language; // "en" or "fr"
    private String title;
    private String date;
    private String description;
    private Integer displayOrder;
}
