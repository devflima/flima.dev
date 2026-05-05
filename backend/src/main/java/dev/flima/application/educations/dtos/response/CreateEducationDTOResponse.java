package dev.flima.application.educations.dtos.response;

import java.util.UUID;

public record CreateEducationDTOResponse(
        UUID id,
        String title
) {}
