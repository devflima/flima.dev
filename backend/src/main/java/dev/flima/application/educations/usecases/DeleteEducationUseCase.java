package dev.flima.application.educations.usecases;

import dev.flima.domain.educations.Education;
import dev.flima.domain.educations.EducationRepository;
import dev.flima.domain.exceptions.EntityNotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class DeleteEducationUseCase {

    private final EducationRepository educationRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public DeleteEducationUseCase(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Education education = educationRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("education.not_found")));

        educationRepository.remove(education);
    }

}
