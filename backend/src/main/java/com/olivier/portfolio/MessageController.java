package com.olivier.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepo;

    @GetMapping
    public List<Message> getAll() {
        return messageRepo.findAll();
    }

    @PostMapping
    public Message create(@RequestBody Message msg) {
        return messageRepo.save(msg);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        messageRepo.deleteById(id);
    }
}
