package dev.flima.application.stacks.dtos.response;

import dev.flima.domain.stacks.StackType;

import java.util.List;
import java.util.UUID;

public record StackDTOResponse(
        UUID id,
        StackType stackType,
        List<String> technologies
) {}
