package dev.flima.application.messages.usecases;

import dev.flima.application.messages.dtos.request.RepliedMessageDTORequest;
import dev.flima.domain.exceptions.BusinessRuleException;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageProducerPort;
import dev.flima.domain.messages.MessageRepository;
import dev.flima.domain.messages.StatusMessage;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

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
        } catch (Exception e) {
            java.util.logging.Logger.getLogger(RepliedMessageUseCase.class.getName())
                .severe("Failed to reply message: " + e.getClass().getName() + " - " + e.getMessage());
            throw new BusinessRuleException(messages.getString("message.trying.reply"));
        }

        message.setStatusMessage(StatusMessage.REPLIED);

        messageRepository.modify(message);
    }

}
