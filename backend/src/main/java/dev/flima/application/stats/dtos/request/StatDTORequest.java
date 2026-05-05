package dev.flima.application.stats.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StatDTORequest(
        @NotNull(message = "{stat.years_experience.not_null}")
        @NotBlank(message = "{stat.years_experience.not_null}")
        String yearsExperience,

        @NotNull(message = "{stat.system_deployed.not_null}")
        @NotBlank(message = "{stat.system_deployed.not_null}")
        String systemDeployed,

        @NotNull(message = "{stat.uptime_sla.not_null}")
        @NotBlank(message = "{stat.uptime_sla.not_null}")
        String uptimeSLA,

        @NotNull(message = "{stat.commits_logged.not_null}")
        @NotBlank(message = "{stat.commits_logged.not_null}")
        String commitsLogged,

        @NotNull(message = "{stat.status.not_null}")
        @NotBlank(message = "{stat.status.not_null}")
        String status,

        String objective
) {}
