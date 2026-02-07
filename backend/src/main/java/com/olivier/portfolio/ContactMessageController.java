package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {
    @Autowired
    private ContactMessageRepository messageRepo;

    @GetMapping
    public List<ContactMessage> getAll() {
        return messageRepo.findByArchived(false);
    }

    @GetMapping("/archived")
    public List<ContactMessage> getArchived() {
        return messageRepo.findByArchived(true);
    }

    @PostMapping
    public ContactMessage create(@RequestBody ContactMessage message) {
        return messageRepo.save(message);
    }

    @PatchMapping("/{id}/archive")
    public ContactMessage archive(@PathVariable Long id) {
        ContactMessage msg = messageRepo.findById(id).orElseThrow();
        msg.setArchived(true);
        return messageRepo.save(msg);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        messageRepo.deleteById(id);
    }
}
