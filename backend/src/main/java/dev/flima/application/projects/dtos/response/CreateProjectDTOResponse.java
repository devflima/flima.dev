package dev.flima.application.projects.dtos.response;

import java.util.UUID;

public record CreateProjectDTOResponse(
        UUID id,
        String title
) {}
