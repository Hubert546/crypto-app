package com.crypto.backend.service;

import com.crypto.backend.model.Message;
import com.crypto.backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final EncryptionService encryptionService;

    // Encrypt message and save to database
    public Message encryptAndSave(String plainText, String owner) {
        Message message = new Message();
        message.setEncryptedContent(encryptionService.encrypt(plainText));
        message.setOwner(owner);
        return messageRepository.save(message);
    }

    // Decrypt a message - only if the user is the owner
    public String decryptMessage(Long messageId, String username) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        // Security check - only owner can decrypt their message
        if (!message.getOwner().equals(username)) {
            throw new RuntimeException("Access denied");
        }

        return encryptionService.decrypt(message.getEncryptedContent());
    }

    // Get all messages for a specific user
    public List<Message> getUserMessages(String username) {
        return messageRepository.findByOwner(username);
    }
}