package com.olivier.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JourneyRepository extends JpaRepository<Journey, Long> {
    List<Journey> findByLanguageOrderByDisplayOrderAsc(String language);
}
