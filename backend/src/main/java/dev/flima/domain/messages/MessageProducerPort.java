package dev.flima.domain.messages;

public interface MessageProducerPort {
    void sendMessage(Message message);
}
