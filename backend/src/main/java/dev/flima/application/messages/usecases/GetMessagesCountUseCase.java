package dev.flima.application.messages.usecases;

import dev.flima.domain.messages.MessageRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GetMessagesCountUseCase {

    private final MessageRepository messageRepository;

    public GetMessagesCountUseCase(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public long execute() {
        return messageRepository.count();
    }
}
