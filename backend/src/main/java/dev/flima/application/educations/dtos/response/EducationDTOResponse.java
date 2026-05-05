package dev.flima.application.educations.dtos.response;

import dev.flima.domain.educations.TypeEducation;

import java.util.List;
import java.util.UUID;

public record EducationDTOResponse(
        UUID id,
        TypeEducation typeEducation,
        String degree,
        String title,
        String institution,
        String period,
        String specialization,
        List<String>skills,
        List<String> architectures
) {}
