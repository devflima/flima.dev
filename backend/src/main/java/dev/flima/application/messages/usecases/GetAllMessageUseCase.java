package dev.flima.application.messages.usecases;

import dev.flima.application.messages.dtos.response.MessageDTOResponse;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class GetAllMessageUseCase {

    private final MessageRepository messageRepository;

    public GetAllMessageUseCase(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<MessageDTOResponse> execute() {
        List<Message> messages = messageRepository.getAll();
        return messages.stream()
                .map(message -> new MessageDTOResponse(
                        message.getId(),
                        message.getUsername(),
                        message.getEmail(),
                        message.getMessage(),
                        message.getSubject(),
                        message.getTimestamp(),
                        message.getStatusMessage()
                ))
                .toList();
    }

}
