package dev.flima.application.educations.usecases;

import dev.flima.application.educations.dtos.request.EducationDTORequest;
import dev.flima.application.educations.dtos.response.CreateEducationDTOResponse;
import dev.flima.domain.educations.Education;
import dev.flima.domain.educations.EducationRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CreateEducationUseCase {

    private final EducationRepository educationRepository;

    public CreateEducationUseCase(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Transactional
    public CreateEducationDTOResponse execute(EducationDTORequest educationDTO) {
        Education education = new Education(
                educationDTO.typeEducation(),
                educationDTO.degree(),
                educationDTO.title(),
                educationDTO.institution(),
                educationDTO.period(),
                educationDTO.specialization(),
                educationDTO.skills(),
                educationDTO.architectures()
        );

        educationRepository.save(education);

        return new CreateEducationDTOResponse(
                education.getId(),
                education.getTitle()
        );
    }

}
