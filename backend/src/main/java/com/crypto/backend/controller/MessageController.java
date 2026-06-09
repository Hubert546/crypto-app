package com.crypto.backend.controller;

import com.crypto.backend.model.Message;
import com.crypto.backend.service.JwtService;
import com.crypto.backend.service.MessageService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;
    private final JwtService jwtService;

    // Encrypt a message and save it to database
    @PostMapping("/encrypt")
    public ResponseEntity<?> encrypt(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody EncryptRequest request) {
        try {
            String username = getUsernameFromToken(authHeader);
            Message message = messageService.encryptAndSave(request.getText(), username);
            return ResponseEntity.ok(new MessageResponse(
                    message.getId(),
                    message.getEncryptedContent(),
                    message.getOwner(),
                    message.getCreatedAt().toString()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Decrypt a specific message by ID
    @GetMapping("/decrypt/{id}")
    public ResponseEntity<?> decrypt(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {
        try {
            String username = getUsernameFromToken(authHeader);
            String decrypted = messageService.decryptMessage(id, username);
            return ResponseEntity.ok(decrypted);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get all messages for the logged-in user
    @GetMapping
    public ResponseEntity<?> getMessages(
            @RequestHeader("Authorization") String authHeader) {
        try {
            String username = getUsernameFromToken(authHeader);
            List<Message> messages = messageService.getUserMessages(username);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Extract username from JWT token in Authorization header
    private String getUsernameFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid authorization header");
        }
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {
            throw new RuntimeException("Invalid or expired token");
        }
        return jwtService.extractUsername(token);
    }

    @Data
    static class EncryptRequest {
        @NotBlank(message = "Text is required")
        private String text;
    }

    @Data
    @RequiredArgsConstructor
    static class MessageResponse {
        private final Long id;
        private final String encryptedContent;
        private final String owner;
        private final String createdAt;
    }
}