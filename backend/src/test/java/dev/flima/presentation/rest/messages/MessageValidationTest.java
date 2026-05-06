package dev.flima.presentation.rest.messages;

import dev.flima.application.messages.dtos.request.MessageDTORequest;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasItem;

@QuarkusTest
class MessageValidationTest {

    @Test
    @DisplayName("Should return 400 when sending message with empty fields")
    void shouldReturnErrorForEmptyMessage() {
        MessageDTORequest request = new MessageDTORequest(
                "",
                "invalid",
                "",
                ""
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/messages")
                .then()
                .statusCode(400)
                .body("message", is("Validation failed"))
                .body("details", hasItem(is("create.messageDTO.username: Username is required.")))
                .body("details", hasItem(is("create.messageDTO.email: Please provide a valid email address.")))
                .body("details", hasItem(is("create.messageDTO.subject: Subject is required to send a message.")))
                .body("details", hasItem(is("create.messageDTO.message: Message body cannot be empty.")));
    }
}
