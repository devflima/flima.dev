package dev.flima.application.educations.dtos.request;

import dev.flima.domain.educations.TypeEducation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record EducationDTORequest(
        @NotNull(message = "{ducation.type_education.not_null}")
        TypeEducation typeEducation,

        @NotNull(message = "{ducation.type_education.not_null}")
        @NotBlank(message = "{ducation.type_education.not_null}")
        String degree,

        @NotNull(message = "{title.not_null_or_empty}")
        @NotBlank(message = "{title.not_null_or_empty}")
        String title,

        @NotNull(message = "{education.institution.not_null}")
        @NotBlank(message = "{education.institution.not_null}")
        String institution,

        @NotNull(message = "{period.not_null_or_empty}")
        @NotBlank(message = "{period.not_null_or_empty}")
        String period,

        @NotNull(message = "{education.specialization.not_null}")
        @NotBlank(message = "{education.specialization.not_null}")
        String specialization,

        @NotNull(message = "{education.skills.not_null}")
        @NotEmpty(message = "{education.skills.not_null}")
        List<String> skills,

        @NotNull(message = "{education.architectures.not_null}")
        @NotEmpty(message = "{education.architectures.not_null}")
        List<String> architectures
) {}
