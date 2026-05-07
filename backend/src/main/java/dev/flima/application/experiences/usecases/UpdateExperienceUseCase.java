package dev.flima.application.experiences.usecases;

import dev.flima.application.experiences.dtos.request.ExperienceDTORequest;
import dev.flima.application.experiences.dtos.response.ExperienceDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.experience.Experience;
import dev.flima.domain.experience.ExperienceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class UpdateExperienceUseCase {

    private final ExperienceRepository experienceRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public UpdateExperienceUseCase(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Transactional
    public ExperienceDTOResponse execute(UUID id, ExperienceDTORequest experienceDTO) {
        Experience experience = experienceRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("experience.not_found")));

        experience.setTitle(experienceDTO.title());
        experience.setCompany(experienceDTO.company());
        experience.setPeriod(experienceDTO.period());
        experience.setBullets(experienceDTO.bullets());
        experience.setTechnologies(experienceDTO.technologies());
        experience.setIcon(experienceDTO.icon());
        experience.setColorClass(experienceDTO.colorClass());

        experienceRepository.modify(experience);

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
