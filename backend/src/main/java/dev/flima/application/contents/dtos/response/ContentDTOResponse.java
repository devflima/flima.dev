package dev.flima.application.contents.dtos.response;

import dev.flima.application.contents.dtos.SectionContentDTO;
import dev.flima.domain.contents.SectionType;

import java.util.UUID;

public record ContentDTOResponse(
        UUID id,
        SectionType sectionType,
        SectionContentDTO sectionContent
) {}
