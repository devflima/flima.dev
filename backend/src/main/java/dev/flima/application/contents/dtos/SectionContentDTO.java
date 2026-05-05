package dev.flima.application.contents.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SectionContentDTO(
        @NotNull(message = "{title.not_null_or_empty}")
        @NotBlank(message = "{title.not_null_or_empty}")
        String title,

        @NotNull(message = "{subtitle.not_null_or_empty}")
        @NotBlank(message = "{subtitle.not_null_or_empty}")
        String subtitle
) {}
