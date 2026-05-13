package dev.flima.application.messages.usecases;

import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageRepository;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class PersistMessageUseCase {

    private final MessageRepository messageRepository;

    public PersistMessageUseCase(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public void execute(Message message) {
        messageRepository.save(message);
        Log.infof("Message persisted from %s <%s>", message.getUsername(), message.getEmail());
    }

}

