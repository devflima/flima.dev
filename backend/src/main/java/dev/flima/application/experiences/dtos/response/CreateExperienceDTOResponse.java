package dev.flima.application.experiences.dtos.response;

import java.util.UUID;

public record CreateExperienceDTOResponse(
        UUID id,
        String title
) {}
