package dev.flima.application.educations.usecases;

import dev.flima.domain.educations.Education;
import dev.flima.domain.educations.EducationRepository;
import dev.flima.domain.educations.TypeEducation;
import dev.flima.domain.exceptions.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeleteEducationUseCaseTest {

    @Mock
    private EducationRepository educationRepository;

    private DeleteEducationUseCase deleteEducationUseCase;

    @BeforeEach
    void setUp() {
        deleteEducationUseCase = new DeleteEducationUseCase(educationRepository);
    }

    @Test
    @DisplayName("Should delete education successfully")
    void shouldDeleteSuccessfully() {
        // Arrange
        UUID id = UUID.randomUUID();
        Education education = new Education(TypeEducation.DEGREE, "D", "T", "I", "P", "S", List.of(), List.of());
        when(educationRepository.getById(id)).thenReturn(Optional.of(education));

        // Act
        deleteEducationUseCase.execute(id);

        // Assert
        verify(educationRepository, times(1)).remove(education);
    }

    @Test
    @DisplayName("Should throw EntityNotFoundException when deleting non-existent education")
    void shouldThrowExceptionWhenNotFound() {
        // Arrange
        UUID id = UUID.randomUUID();
        when(educationRepository.getById(id)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> deleteEducationUseCase.execute(id));
    }
}
