package dev.flima.application.experiences.dtos.response;

import java.util.List;
import java.util.UUID;

public record ExperienceDTOResponse(
        UUID id,
        String title,
        String company,
        String period,
        List<String> bullets,
        List<String> technologies,
        String icon,
        String colorClass
) {}
