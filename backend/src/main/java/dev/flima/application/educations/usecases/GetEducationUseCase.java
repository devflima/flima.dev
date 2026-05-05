package dev.flima.application.educations.usecases;

import dev.flima.application.educations.dtos.response.EducationDTOResponse;
import dev.flima.domain.educations.Education;
import dev.flima.domain.educations.EducationRepository;
import dev.flima.domain.exceptions.EntityNotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class GetEducationUseCase {

    private final EducationRepository educationRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public GetEducationUseCase(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    public EducationDTOResponse execute(UUID id) {
        Education education = educationRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("education.not_found")));

        return new EducationDTOResponse(
                education.getId(),
                education.getTypeEducation(),
                education.getDegree(),
                education.getTitle(),
                education.getInstitution(),
                education.getPeriod(),
                education.getSpecialization(),
                education.getSkills(),
                education.getArchitectures()
        );
    }

}
