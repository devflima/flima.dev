package dev.flima.application.educations.usecases;

import dev.flima.application.educations.dtos.request.EducationDTORequest;
import dev.flima.application.educations.dtos.response.CreateEducationDTOResponse;
import dev.flima.domain.educations.Education;
import dev.flima.domain.educations.EducationRepository;
import dev.flima.domain.educations.TypeEducation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CreateEducationUseCaseTest {

    @Mock
    private EducationRepository educationRepository;

    private CreateEducationUseCase createEducationUseCase;

    @BeforeEach
    void setUp() {
        createEducationUseCase = new CreateEducationUseCase(educationRepository);
    }

    @Test
    @DisplayName("Should create an education entry successfully")
    void shouldCreateEducationSuccessfully() {
        // Arrange
        EducationDTORequest request = new EducationDTORequest(
                TypeEducation.DEGREE,
                "Bachelor",
                "Computer Science",
                "Tech University",
                "2018-2022",
                "Software Engineering",
                List.of("Java", "Spring"),
                List.of("Clean Architecture")
        );

        // Act
        CreateEducationDTOResponse response = createEducationUseCase.execute(request);

        // Assert
        assertNotNull(response);
        assertNotNull(response.id());
        assertEquals("Computer Science", response.title());

        // Verify repository interaction
        ArgumentCaptor<Education> educationCaptor = ArgumentCaptor.forClass(Education.class);
        verify(educationRepository, times(1)).save(educationCaptor.capture());

        Education savedEducation = educationCaptor.getValue();
        assertEquals(TypeEducation.DEGREE, savedEducation.getTypeEducation());
        assertEquals("Bachelor", savedEducation.getDegree());
        assertEquals("Computer Science", savedEducation.getTitle());
        assertEquals("Tech University", savedEducation.getInstitution());
        assertEquals("2018-2022", savedEducation.getPeriod());
        assertEquals("Software Engineering", savedEducation.getSpecialization());
        assertEquals(List.of("Java", "Spring"), savedEducation.getSkills());
        assertEquals(List.of("Clean Architecture"), savedEducation.getArchitectures());
    }
}
