package dev.flima.application.messages.usecases;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class DeleteMessaUseCase {

    private final MessageRepository messageRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public DeleteMessaUseCase(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Message message = messageRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("message.not_found")));

        messageRepository.remove(message);
    }

}
