package dev.flima.application.auth.dtos.response;

import dev.flima.domain.users.Role;

public record LoginDTOResponse(
        String username,
        Role role,
        String token
) {}
