package dev.flima.application.contents.dtos.request;

import dev.flima.application.contents.dtos.SectionContentDTO;
import dev.flima.domain.contents.SectionType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ContentDTORequest(
        @NotNull(message = "{content.section_type.not_null}")
        SectionType sectionType,

        @Valid
        SectionContentDTO sectionContent
) {}
