package dev.flima.application.stats.dtos.response;

import java.util.UUID;

public record StatDTOResponse(
        UUID id,
        String yearsExperience,
        String systemDeployed,
        String uptimeSLA,
        String commitsLogged,
        String status,
        String objective
) {}
