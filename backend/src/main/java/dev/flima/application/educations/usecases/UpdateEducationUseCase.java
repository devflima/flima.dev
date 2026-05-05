package dev.flima.application.educations.usecases;

import dev.flima.application.educations.dtos.request.EducationDTORequest;
import dev.flima.application.educations.dtos.response.EducationDTOResponse;
import dev.flima.domain.educations.Education;
import dev.flima.domain.educations.EducationRepository;
import dev.flima.domain.exceptions.EntityNotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class UpdateEducationUseCase {

    private final EducationRepository educationRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public UpdateEducationUseCase(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Transactional
    public EducationDTOResponse execute(UUID id, EducationDTORequest educationDTO) {
        Education education = educationRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("education.not_found")));

        education.setTypeEducation(educationDTO.typeEducation());
        education.setDegree(educationDTO.degree());
        education.setTitle(educationDTO.title());
        education.setInstitution(educationDTO.institution());
        education.setPeriod(educationDTO.period());
        education.setSpecialization(educationDTO.specialization());
        education.setSkills(educationDTO.skills());
        education.setArchitectures(educationDTO.architectures());

        educationRepository.modify(education);

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
