package dev.flima.application.projects.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ProjectDTORequest(
        @NotNull(message = "{title.not_null_or_empty}")
        @NotBlank(message = "{title.not_null_or_empty}")
        String title,

        @NotNull(message = "{subtitle.not_null_or_empty}")
        @NotBlank(message = "{subtitle.not_null_or_empty}")
        String subtitle,

        @NotNull(message = "{project.description.not_null}")
        @NotBlank(message = "{project.description.not_null}")
        String description,

        List<String>technologies,
        String codeSnippet,
        String icon
) {}
