package dev.flima.infrastructure.messaging;

import dev.flima.domain.messages.Message;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.kafka.KafkaCompanionResource;
import io.quarkus.test.kafka.InjectKafkaCompanion;
import io.smallrye.reactive.messaging.kafka.companion.KafkaCompanion;
import jakarta.inject.Inject;
import org.awaitility.Awaitility;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.UUID;

@QuarkusTest
@QuarkusTestResource(KafkaCompanionResource.class)
class ContactMessagingAdapterTest {

    @Inject
    ContactMessagingAdapter contactMessagingAdapter;

    @InjectKafkaCompanion
    KafkaCompanion companion;

    @Test
    @DisplayName("Should produce a message to Kafka topic when sendMessage is called")
    void shouldProduceMessageToKafka() {
        String uniqueUser = "tester-" + UUID.randomUUID();
        // Arrange
        Message message = new Message(
                uniqueUser,
                "tester@example.com",
                "Subject",
                "Body"
        );

        // Act
        contactMessagingAdapter.sendMessage(message);

        // Assert
        Awaitility.await()
                .atMost(Duration.ofSeconds(15))
                .untilAsserted(() -> {
                    var records = companion.consumeStrings()
                            .fromTopics("contact-messages", 1)
                            .awaitCompletion(Duration.ofSeconds(10))
                            .getRecords();
                    
                    boolean found = records.stream()
                            .anyMatch(record -> record.value().contains("\"username\":\"" + uniqueUser + "\""));
                    org.junit.jupiter.api.Assertions.assertTrue(found, "Message not found in Kafka topic: " + uniqueUser);
                });
    }
}
