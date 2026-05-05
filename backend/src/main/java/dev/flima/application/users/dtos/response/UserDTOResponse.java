package dev.flima.application.users.dtos.response;

import dev.flima.domain.users.Role;

public record UserDTOResponse(
        String username,
        Role role
) {}
