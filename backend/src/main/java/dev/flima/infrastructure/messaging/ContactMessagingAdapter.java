package dev.flima.infrastructure.messaging;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.flima.application.messages.dtos.request.MessageDTORequest;
import dev.flima.application.messages.usecases.PersistMessageUseCase;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageProducerPort;
import dev.flima.infrastructure.messages.MessagePanacheEntity;
import dev.flima.infrastructure.messages.MessageRepositoryImpl;
import io.quarkus.logging.Log;
import io.smallrye.common.annotation.Blocking;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;
import org.eclipse.microprofile.reactive.messaging.Incoming;

@ApplicationScoped
public class ContactMessagingAdapter implements MessageProducerPort {

    @Inject
    ObjectMapper objectMapper;

    @Inject
    PersistMessageUseCase persistMessageUseCase;

    @Channel("contact-out")
    Emitter<String> contactEmitter;

    @Override
    public void sendMessage(Message message) {
        try {
            String json = objectMapper.writeValueAsString(message);
            contactEmitter.send(json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error serializing message", e);
        }
    }

    @Incoming("contact-in")
    @Blocking
    @Transactional
    public void processContactResponse(String messagePayload) {
        try {
            Message messageReceive = objectMapper.readValue(messagePayload, Message.class);

            Message message = new Message(
                    messageReceive.getUsername(),
                    messageReceive.getEmail(),
                    messageReceive.getSubject(),
                    messageReceive.getMessage()
            );

            persistMessageUseCase.execute(message);
        } catch (JsonProcessingException e) {
            Log.error("Falha ao processar mensagem. Enviando para DLQ: " + messagePayload, e);
            throw  new RuntimeException(e);
        }
    }

}
