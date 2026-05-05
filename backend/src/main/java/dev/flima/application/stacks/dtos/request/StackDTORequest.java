package dev.flima.application.stacks.dtos.request;

import dev.flima.domain.stacks.StackType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record StackDTORequest(
        @NotNull(message = "{stack.stack_type.not_null}")
        StackType stackType,

        @NotNull(message = "{technologies.not_null_or_empty}")
        @NotEmpty(message = "{technologies.not_null_or_empty}")
        List<String> technologies
) {}
