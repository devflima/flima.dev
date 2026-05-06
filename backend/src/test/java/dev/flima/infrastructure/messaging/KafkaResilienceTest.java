package dev.flima.infrastructure.messaging;

import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.kafka.InjectKafkaCompanion;
import io.quarkus.test.kafka.KafkaCompanionResource;
import io.smallrye.reactive.messaging.kafka.companion.KafkaCompanion;
import org.awaitility.Awaitility;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
@QuarkusTestResource(KafkaCompanionResource.class)
class KafkaResilienceTest {

    @InjectKafkaCompanion
    KafkaCompanion kafkaCompanion;

    @Test
    @DisplayName("Should send message to DLQ when JSON is invalid")
    void shouldSendToDlqOnInvalidJson() {
        // 1. Produce a "poison pill" (invalid JSON)
        kafkaCompanion.produceStrings()
                .fromRecords(new org.apache.kafka.clients.producer.ProducerRecord<>("contact-messages", "INVALID_JSON_PAYLOAD"))
                .awaitCompletion();

        // 2. Verify it landed in the DLQ topic
        Awaitility.await()
                .atMost(Duration.ofSeconds(20))
                .untilAsserted(() -> {
                    var dlqConsumer = kafkaCompanion.consumeStrings()
                            .fromTopics("contact-messages-dlq", 1)
                            .awaitCompletion(Duration.ofSeconds(10));
                    
                    assertTrue(dlqConsumer.count() >= 1, "Poison pill should be in DLQ");
                    assertTrue(dlqConsumer.getFirstRecord().value().contains("INVALID_JSON_PAYLOAD"));
                });
    }
}
