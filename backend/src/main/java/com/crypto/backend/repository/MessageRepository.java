package com.crypto.backend.repository;

import com.crypto.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    // Get all messages belonging to a specific user
    List<Message> findByOwner(String owner);
}