package dev.flima.application.messages.usecases;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageRepository;
import dev.flima.domain.messages.StatusMessage;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class ReadMessageUseCase {

    private final MessageRepository messageRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public ReadMessageUseCase(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Message message = messageRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("message.not_found")));

        if(!message.getStatusMessage().equals(StatusMessage.UNREAD)) {
            throw new EntityNotFoundException(messages.getString("message.status_message.not_null"));
        }

        message.setStatusMessage(StatusMessage.READ);
        messageRepository.modify(message);
    }

}
