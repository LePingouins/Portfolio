package com.olivier.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AboutMeRepository extends JpaRepository<AboutMe, Long> {
    Optional<AboutMe> findByLanguage(String language);
}
