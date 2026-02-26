package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aboutme")
public class AboutMeController {

    @Autowired
    private AboutMeRepository aboutMeRepo;

    @GetMapping
    public List<AboutMe> getAll() {
        return aboutMeRepo.findAll();
    }

    @GetMapping("/{language}")
    public AboutMe getByLanguage(@PathVariable String language) {
        return aboutMeRepo.findByLanguage(language).orElse(null);
    }

    @PostMapping
    public AboutMe save(@RequestBody AboutMe aboutMe) {
        AboutMe existing = aboutMeRepo.findByLanguage(aboutMe.getLanguage()).orElse(null);
        if (existing != null) {
            existing.setText(aboutMe.getText());
            existing.setStack(aboutMe.getStack());
            existing.setHobbies(aboutMe.getHobbies());
            existing.setGoals(aboutMe.getGoals());
            return aboutMeRepo.save(existing);
        }
        return aboutMeRepo.save(aboutMe);
    }
}
