package dev.flima.presentation.rest.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.List;

public record ErrorResponse(
        String message,
        int status,
        LocalDateTime timestamp,

        @JsonInclude(JsonInclude.Include.NON_NULL)
        List<String> details
) {
    public ErrorResponse {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }

    public static ErrorResponse of(String message, int status) {
        return new ErrorResponse(message, status, LocalDateTime.now(), null);
    }

    public static ErrorResponse of(String message, int status, List<String> details) {
        return new ErrorResponse(message, status, LocalDateTime.now(), details);
    }
}