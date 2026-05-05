package dev.flima.application.contents.dtos.response;

import java.util.UUID;

public record CreateContentDTOResponse(
        UUID id,
        String sectionContent
) {}
