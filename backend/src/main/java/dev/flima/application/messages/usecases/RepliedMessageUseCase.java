package dev.flima.application.messages.usecases;

import dev.flima.application.messages.dtos.request.RepliedMessageDTORequest;
import dev.flima.domain.exceptions.BusinessRuleException;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageProducerPort;
import dev.flima.domain.messages.MessageRepository;
import dev.flima.domain.messages.StatusMessage;
import io.quarkus.logging.Log;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class RepliedMessageUseCase {

    private final MessageRepository messageRepository;
    private final MessageProducerPort messageProducer;
    private final Mailer mailer;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public RepliedMessageUseCase(MessageRepository messageRepository, MessageProducerPort messageProducer, Mailer mailer) {
        this.messageRepository = messageRepository;
        this.messageProducer = messageProducer;
        this.mailer = mailer;
    }

    @Transactional
    public void execute(UUID id, RepliedMessageDTORequest request) {
        Message message = messageRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("message.not_found")));

        if(message.getStatusMessage().equals(StatusMessage.REPLIED)) {
            throw new BusinessRuleException(messages.getString("message.invalid_status_for_reply"));
        }

        Message myMessage = new Message(
                "flima.dev",
                request.email(),
                String.format("Response payload for: %s", message.getSubject()),
                request.message()
        );

        try {
            mailer.send(Mail.withText(
                    request.email(),
                    String.format("Response payload for: %s", message.getSubject()),
                    request.message()
            ));

            messageProducer.sendMessage(myMessage);
            Log.infof("Reply sent successfully to %s for message %s", request.email(), id);
        } catch (Exception e) {
            Log.errorf(e, "Failed to reply message %s: %s", id, e.getMessage());
            throw new BusinessRuleException(messages.getString("message.trying.reply"));
        }

        message.setStatusMessage(StatusMessage.REPLIED);

        messageRepository.modify(message);
    }

}

