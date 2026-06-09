package com.crypto.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The encrypted content stored in database
    @Column(nullable = false, length = 1000)
    private String encryptedContent;

    // Username of the owner - only they can read it
    @Column(nullable = false)
    private String owner;

    // Timestamp when message was created
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}