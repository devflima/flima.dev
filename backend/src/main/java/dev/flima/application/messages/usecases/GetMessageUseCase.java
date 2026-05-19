package dev.flima.application.messages.usecases;

import dev.flima.application.messages.dtos.response.MessageDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageRepository;
import dev.flima.domain.messages.StatusMessage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class GetMessageUseCase {

    private final MessageRepository messageRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public GetMessageUseCase(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public MessageDTOResponse execute(UUID id) {
        Message message = messageRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("message.not_found")));

        return new MessageDTOResponse(
                message.getId(),
                message.getUsername(),
                message.getEmail(),
                message.getMessage(),
                message.getSubject(),
                message.getTimestamp(),
                message.getStatusMessage(),
                message.isLgpdConsent(),
                message.getReplyText(),
                message.getReplyTimestamp()
        );
    }

}
