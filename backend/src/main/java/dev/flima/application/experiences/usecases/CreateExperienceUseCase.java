package dev.flima.application.experiences.usecases;

import dev.flima.application.experiences.dtos.request.ExperienceDTORequest;
import dev.flima.application.experiences.dtos.response.CreateExperienceDTOResponse;
import dev.flima.domain.experience.Experience;
import dev.flima.domain.experience.ExperienceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CreateExperienceUseCase {

    private final ExperienceRepository experienceRepository;

    public CreateExperienceUseCase(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Transactional
    public CreateExperienceDTOResponse execute(ExperienceDTORequest experienceDTO) {
        Experience experience = new Experience(
                experienceDTO.title(),
                experienceDTO.company(),
                experienceDTO.period(),
                experienceDTO.bullets(),
                experienceDTO.technologies(),
                experienceDTO.icon(),
                experienceDTO.colorClass()
        );

        experienceRepository.save(experience);

        return new CreateExperienceDTOResponse(
                experience.getId(),
                experience.getTitle(),
                experience.getColorClass()
        );
    }

}
