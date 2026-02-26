package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journey")
public class JourneyController {

    @Autowired
    private JourneyRepository journeyRepo;

    @GetMapping("/{language}")
    public List<Journey> getByLanguage(@PathVariable String language) {
        return journeyRepo.findByLanguageOrderByDisplayOrderAsc(language);
    }

    @PostMapping
    public Journey addJourney(@RequestBody Journey journey) {
        return journeyRepo.save(journey);
    }

    @PutMapping("/{id}")
    public Journey updateJourney(@PathVariable Long id, @RequestBody Journey journey) {
        journey.setId(id);
        return journeyRepo.save(journey);
    }

    @DeleteMapping("/{id}")
    public void deleteJourney(@PathVariable Long id) {
        journeyRepo.deleteById(id);
    }
}
