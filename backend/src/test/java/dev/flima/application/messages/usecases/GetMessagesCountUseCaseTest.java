package dev.flima.application.messages.usecases;

import dev.flima.domain.messages.MessageRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GetMessagesCountUseCaseTest {

    @Test
    @DisplayName("Should return the exact count of messages from repository")
    void shouldReturnMessagesCount() {
        // Arrange
        MessageRepository repo = Mockito.mock(MessageRepository.class);
        Mockito.when(repo.count()).thenReturn(42L);
        
        GetMessagesCountUseCase useCase = new GetMessagesCountUseCase(repo);

        // Act
        long count = useCase.execute();

        // Assert
        assertEquals(42L, count);
        Mockito.verify(repo, Mockito.times(1)).count();
    }
}
