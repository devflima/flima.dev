package dev.flima.application.experiences.usecases;

import dev.flima.application.experiences.dtos.response.ExperienceDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.experience.Experience;
import dev.flima.domain.experience.ExperienceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class GetExperienceUseCase {

    private final ExperienceRepository experienceRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public GetExperienceUseCase(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    public ExperienceDTOResponse execute(UUID id) {
        Experience experience = this.experienceRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("experience.not_found")));

        return new ExperienceDTOResponse(
                experience.getId(),
                experience.getTitle(),
                experience.getCompany(),
                experience.getPeriod(),
                experience.getBullets(),
                experience.getTechnologies(),
                experience.getIcon(),
                experience.getColorClass()
        );
    }

}
