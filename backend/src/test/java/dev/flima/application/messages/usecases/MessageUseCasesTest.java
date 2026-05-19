package dev.flima.application.messages.usecases;

import dev.flima.application.messages.dtos.request.MessageDTORequest;
import dev.flima.application.messages.dtos.request.RepliedMessageDTORequest;
import dev.flima.domain.exceptions.BusinessRuleException;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageProducerPort;
import dev.flima.domain.messages.MessageRepository;
import dev.flima.domain.messages.StatusMessage;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class MessageUseCasesTest {

    @Test
    @DisplayName("Should test CreateMessageUseCase execution and logging")
    void testCreateMessageUseCase() {
        MessageProducerPort port = Mockito.mock(MessageProducerPort.class);
        CreateMessageUseCase useCase = new CreateMessageUseCase(port);

        useCase.execute(new MessageDTORequest("user", "test@example.com", "sub", "msg", true));

        Mockito.verify(port).sendMessage(ArgumentMatchers.any(Message.class));
    }

    @Test
    @DisplayName("Should test PersistMessageUseCase execution and logging")
    void testPersistMessageUseCase() {
        MessageRepository repo = Mockito.mock(MessageRepository.class);
        PersistMessageUseCase useCase = new PersistMessageUseCase(repo);

        useCase.execute(new Message("user", "test@example.com", "sub", "msg", true));

        Mockito.verify(repo).save(ArgumentMatchers.any(Message.class));
    }

    @Test
    @DisplayName("Should test RepliedMessageUseCase success execution and logging")
    void testRepliedMessageUseCaseSuccess() {
        MessageRepository repo = Mockito.mock(MessageRepository.class);
        MessageProducerPort port = Mockito.mock(MessageProducerPort.class);
        Mailer mailer = Mockito.mock(Mailer.class);

        UUID id = UUID.randomUUID();
        Message originalMessage = new Message(id, "user", "test@example.com", "msg", "sub", LocalDateTime.now(), StatusMessage.UNREAD, true, null, null);
        Mockito.when(repo.getById(id)).thenReturn(Optional.of(originalMessage));

        RepliedMessageUseCase useCase = new RepliedMessageUseCase(repo, port, mailer);

        useCase.execute(id, new RepliedMessageDTORequest("reply@example.com", "sub", "reply text"));

        Mockito.verify(mailer).send(ArgumentMatchers.any(Mail.class));
        Mockito.verify(repo).modify(ArgumentMatchers.any(Message.class));
        assertEquals(StatusMessage.REPLIED, originalMessage.getStatusMessage());
    }

    @Test
    @DisplayName("Should test RepliedMessageUseCase error execution and logging")
    void testRepliedMessageUseCaseError() {
        MessageRepository repo = Mockito.mock(MessageRepository.class);
        MessageProducerPort port = Mockito.mock(MessageProducerPort.class);
        Mailer mailer = Mockito.mock(Mailer.class);

        UUID id = UUID.randomUUID();
        Message originalMessage = new Message(id, "user", "test@example.com", "msg", "sub", LocalDateTime.now(), StatusMessage.UNREAD, true, null, null);
        Mockito.when(repo.getById(id)).thenReturn(Optional.of(originalMessage));

        Mockito.doThrow(new RuntimeException("Mailer error")).when(mailer).send(ArgumentMatchers.any(Mail.class));

        RepliedMessageUseCase useCase = new RepliedMessageUseCase(repo, port, mailer);

        RepliedMessageDTORequest request = new RepliedMessageDTORequest("reply@example.com", "sub", "reply text");
        assertThrows(BusinessRuleException.class, () -> useCase.execute(id, request));
    }

    @Test
    @DisplayName("Should test RepliedMessageUseCase throws when already replied")
    void testRepliedMessageUseCaseAlreadyReplied() {
        MessageRepository repo = Mockito.mock(MessageRepository.class);
        MessageProducerPort port = Mockito.mock(MessageProducerPort.class);
        Mailer mailer = Mockito.mock(Mailer.class);

        UUID id = UUID.randomUUID();
        Message originalMessage = new Message(id, "user", "test@example.com", "msg", "sub", LocalDateTime.now(), StatusMessage.REPLIED, true, null, null);
        Mockito.when(repo.getById(id)).thenReturn(Optional.of(originalMessage));

        RepliedMessageUseCase useCase = new RepliedMessageUseCase(repo, port, mailer);

        RepliedMessageDTORequest request = new RepliedMessageDTORequest("reply@example.com", "sub", "reply text");
        assertThrows(BusinessRuleException.class, () -> useCase.execute(id, request));
    }
}
