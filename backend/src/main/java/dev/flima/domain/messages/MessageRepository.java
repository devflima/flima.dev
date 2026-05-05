package dev.flima.domain.messages;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageRepository {
    void save(Message message);
    void modify(Message message);
    Optional<Message> getById(UUID id);
    List<Message> getAll();
    void remove(Message message);
}
