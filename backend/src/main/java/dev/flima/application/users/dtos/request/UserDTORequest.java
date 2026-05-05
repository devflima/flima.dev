package dev.flima.application.users.dtos.request;

import dev.flima.domain.users.Password;
import dev.flima.domain.users.Role;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserDTORequest(
        @NotNull(message = "{username.not_null}")
        @NotBlank(message = "{username.not_null}")
        String username,

        @NotNull(message = "{user.name.not_null}")
        @NotBlank(message = "{user.name.not_null}")
        String name,

        @NotNull(message = "{user.last_name.not_null}")
        @NotBlank(message = "{user.last_name.not_null}")
        String lastName,

        @NotNull(message = "{email.not_null}")
        @NotBlank(message = "{email.not_null}")
        @Email(message = "{email.invalid}")
        String email,

        @NotNull(message = "{user.role.not_null}")
        Role role,

        @Valid
        Password password
) {}
