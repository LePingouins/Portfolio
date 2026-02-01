package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contactinfo")
public class ContactInfoController {
    @Autowired
    private ContactInfoRepository contactRepo;

    @GetMapping
    public List<ContactInfo> getAll() {
        return contactRepo.findAll();
    }

    @PostMapping
    public ContactInfo create(@RequestBody ContactInfo info) {
        return contactRepo.save(info);
    }

    @PutMapping("/{id}")
    public ContactInfo update(@PathVariable Long id, @RequestBody ContactInfo info) {
        info.setId(id);
        return contactRepo.save(info);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        contactRepo.deleteById(id);
    }
}
