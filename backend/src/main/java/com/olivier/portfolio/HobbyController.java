package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hobbies")
public class HobbyController {
    @Autowired
    private HobbyRepository hobbyRepo;

    @GetMapping
    public List<Hobby> getAll() {
        return hobbyRepo.findAll();
    }

    @PostMapping
    public Hobby create(@RequestBody Hobby hobby) {
        return hobbyRepo.save(hobby);
    }

    @PutMapping("/{id}")
    public Hobby update(@PathVariable Long id, @RequestBody Hobby hobby) {
        hobby.setId(id);
        return hobbyRepo.save(hobby);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        hobbyRepo.deleteById(id);
    }
}
