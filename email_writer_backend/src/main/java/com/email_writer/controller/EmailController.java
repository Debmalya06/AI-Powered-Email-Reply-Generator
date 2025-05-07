package com.email_writer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.email_writer.model.EmailRequest;
import com.email_writer.services.EmailGeneratorService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = {"https://mail.google.com", "http://localhost:5174"})

public class EmailController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        System.out.println("Received EmailRequest: " + emailRequest);
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        System.out.println("Generated Response: " + response);
        return ResponseEntity.ok(response);
    }
}