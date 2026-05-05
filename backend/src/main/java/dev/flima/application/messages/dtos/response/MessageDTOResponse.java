package dev.flima.application.messages.dtos.response;

import dev.flima.domain.messages.StatusMessage;

import java.time.LocalDateTime;
import java.util.UUID;

public record MessageDTOResponse(
        UUID id,
        String username,
        String email,
        String message,
        String subject,
        LocalDateTime timestamp,
        StatusMessage statusMessage
) {}
