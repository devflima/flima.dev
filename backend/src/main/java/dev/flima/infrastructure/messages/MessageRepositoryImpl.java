package dev.flima.infrastructure.messages;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.messages.Message;
import dev.flima.domain.messages.MessageRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class MessageRepositoryImpl implements MessageRepository, PanacheRepositoryBase<MessagePanacheEntity, UUID> {

    private final ResourceBundle messages = ResourceBundle.getBundle("messages");
    @Override
    public void save(Message message) {
        MessagePanacheEntity entity = new MessagePanacheEntity();

        entity.id = message.getId();
        entity.username = message.getUsername();
        entity.email = message.getEmail();
        entity.subject = message.getSubject();
        entity.message = message.getMessage();
        entity.timestamp = message.getTimestamp();
        entity.statusMessage = message.getStatusMessage();
        entity.lgpdConsent = message.isLgpdConsent();
        entity.replyText = message.getReplyText();
        entity.replyTimestamp = message.getReplyTimestamp();

        persist(entity);
    }

    @Override
    public void modify(Message message) {
        MessagePanacheEntity entity = findById(message.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("message.not_found"));
        }

        entity.username = message.getUsername();
        entity.email = message.getEmail();
        entity.subject = message.getSubject();
        entity.message = message.getMessage();
        entity.statusMessage = message.getStatusMessage();
        entity.lgpdConsent = message.isLgpdConsent();
        entity.replyText = message.getReplyText();
        entity.replyTimestamp = message.getReplyTimestamp();
    }

    @Override
    public Optional<Message> getById(UUID id) {
        MessagePanacheEntity entity = findById(id);

        if (entity == null) {
            throw new NotFoundException("Message not found");
        }

        return Optional.of(new Message(
                entity.id,
                entity.username,
                entity.email,
                entity.subject,
                entity.message,
                entity.timestamp,
                entity.statusMessage,
                entity.lgpdConsent,
                entity.replyText,
                entity.replyTimestamp
        ));
    }

    @Override
    public List<Message> getAll() {
        return findAll().list().stream()
                .map(entity -> new Message(
                        entity.id,
                        entity.username,
                        entity.email,
                        entity.subject,
                        entity.message,
                        entity.timestamp,
                        entity.statusMessage,
                        entity.lgpdConsent,
                        entity.replyText,
                        entity.replyTimestamp
                ))
                .toList();
    }

    @Override
    public void remove(Message message) {
        MessagePanacheEntity entity = findById(message.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("message.not_found"));
        }

        delete(entity);
    }

    @Override
    public long count() {
        return findAll().count();
    }
}
