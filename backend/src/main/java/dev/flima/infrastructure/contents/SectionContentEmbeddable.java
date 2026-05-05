package dev.flima.infrastructure.contents;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Embeddable
public class SectionContentEmbeddable {
    @NotNull(message = "Title cannot be null.")
    @NotBlank(message = "Title cannot be blank.")
    public String title;

    @NotNull(message = "Subtitle cannot be null.")
    @NotBlank(message = "Subtitle cannot be blank.")
    public String subtitle;
}
