package dev.flima.application.educations.usecases;

import dev.flima.application.educations.dtos.response.EducationDTOResponse;
import dev.flima.domain.educations.EducationRepository;
import io.quarkus.cache.CacheResult;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class GetAllEducationUseCase {

    private final EducationRepository educationRepository;

    public GetAllEducationUseCase(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @CacheResult(cacheName = "educations-cache")
    public List<EducationDTOResponse> execute() {
        return educationRepository.getAll().stream()
                .map(education -> new EducationDTOResponse(
                        education.getId(),
                        education.getTypeEducation(),
                        education.getDegree(),
                        education.getTitle(),
                        education.getInstitution(),
                        education.getPeriod(),
                        education.getSpecialization(),
                        education.getSkills(),
                        education.getArchitectures()
                ))
                .toList();
    }

}
