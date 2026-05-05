package dev.flima.application.projects.dtos.response;

import java.util.List;
import java.util.UUID;

public record ProjectDTOResponse(
        UUID id,
        String title,
        String subtitle,
        String description,
        List<String> technologies,
        String codeSnippet,
        String icon
) {}
