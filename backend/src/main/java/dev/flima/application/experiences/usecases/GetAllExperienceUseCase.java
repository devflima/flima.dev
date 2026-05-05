package dev.flima.application.experiences.usecases;

import dev.flima.application.experiences.dtos.response.ExperienceDTOResponse;
import dev.flima.domain.experience.Experience;
import dev.flima.domain.experience.ExperienceRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class GetAllExperienceUseCase {

    private final ExperienceRepository experienceRepository;

    public GetAllExperienceUseCase(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public List<ExperienceDTOResponse> execute() {
        List<Experience> experiences = experienceRepository.getAll();
        return experiences.stream()
                .map(experience -> new ExperienceDTOResponse(
                        experience.getId(),
                        experience.getTitle(),
                        experience.getCompany(),
                        experience.getPeriod(),
                        experience.getBullets(),
                        experience.getTechnologies(),
                        experience.getIcon()
                ))
                .toList();
    }

}
