package dev.flima.domain.contents;

import jakarta.validation.constraints.NotBlank;

public record SectionContent(
        @NotBlank(message = "Title cannot be null or empty")
        String title,
        @NotBlank(message = "Subtitle cannot be null or empty")
        String subtitle
) {}
