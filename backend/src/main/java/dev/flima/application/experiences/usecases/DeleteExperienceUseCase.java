package dev.flima.application.experiences.usecases;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.experience.Experience;
import dev.flima.domain.experience.ExperienceRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class DeleteExperienceUseCase {

    private final ExperienceRepository experienceRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public DeleteExperienceUseCase(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Experience experience = experienceRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("experience.not_found")));

        experienceRepository.remove(experience);
    }

}
