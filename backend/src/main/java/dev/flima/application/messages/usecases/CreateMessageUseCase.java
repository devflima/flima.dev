package dev.flima.application.messages.usecases;

import dev.flima.application.messages.dtos.request.MessageDTORequest;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageProducerPort;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CreateMessageUseCase {

    private MessageProducerPort messageProducer;

    public CreateMessageUseCase(MessageProducerPort messageProducer) {
        this.messageProducer = messageProducer;
    }

    public void execute(MessageDTORequest messageDTO) {
        Message message = new Message(
                messageDTO.username(),
                messageDTO.email(),
                messageDTO.subject(),
                messageDTO.message()
        );

        messageProducer.sendMessage(message);
        Log.infof("Contact message received from %s <%s>: %s", messageDTO.username(), messageDTO.email(), messageDTO.subject());
    }

}

