package dev.flima.application.experiences.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ExperienceDTORequest(
        @NotNull(message = "{title.not_null_or_empty}")
        @NotBlank(message = "{title.not_null_or_empty}")
        String title,

        @NotNull(message = "{experience.company.not_null}")
        @NotBlank(message = "{experience.company.not_null}")
        String company,

        @NotNull(message = "{period.not_null_or_empty}")
        @NotBlank(message = "{period.not_null_or_empty}")
        String period,

        @NotNull(message = "{experience.bullets.not_null}")
        @NotEmpty(message = "{experience.bullets.not_null}")
        List<String>bullets,
        List<String> technologies,
        String icon
) {}
