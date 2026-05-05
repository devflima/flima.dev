package dev.flima.domain.messages;

import java.time.LocalDateTime;
import java.util.UUID;

public class Message {

    private UUID id;
    private String username;
    private String email;
    private String subject;
    private String message;
    private LocalDateTime timestamp;
    private StatusMessage statusMessage;

    public Message() {}

    public Message(String username, String email, String message, String subject) {
        this.id = UUID.randomUUID();
        this.username = username;
        this.email = email;
        this.message = message;
        this.subject = subject;
        this.timestamp = LocalDateTime.now();
        this.statusMessage = StatusMessage.UNREAD;
    }

    public Message(UUID id, String username, String email, String message, String subject, LocalDateTime timestamp, StatusMessage statusMessage) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.message = message;
        this.subject = subject;
        this.timestamp = timestamp;
        this.statusMessage = statusMessage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public StatusMessage getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(StatusMessage statusMessage) {
        this.statusMessage = statusMessage;
    }
}
