package dev.flima.application.auth.dtos.request;

import dev.flima.domain.users.Password;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoginDTORequest(
        @NotNull(message = "{username.not_null}")
        @NotBlank(message = "{username.not_null}")
        String username,

        @Valid
        Password password
) {}
