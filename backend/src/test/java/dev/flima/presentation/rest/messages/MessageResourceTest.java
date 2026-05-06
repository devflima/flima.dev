package dev.flima.presentation.rest.messages;

import dev.flima.application.messages.dtos.request.MessageDTORequest;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class MessageResourceTest {

    @Test
    @DisplayName("Should create a message successfully (PermitAll)")
    void shouldCreateMessage() {
        MessageDTORequest request = new MessageDTORequest(
                "visitor",
                "visitor@example.com",
                "Hello",
                "This is a test message"
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/messages")
                .then()
                .statusCode(201);
    }

    @Test
    @DisplayName("Should return 401 when getting all messages without authentication")
    void shouldReturnUnauthorizedForGetAll() {
        given()
                .when()
                .get("/messages")
                .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("Should return 403 when getting all messages with wrong role")
    @TestSecurity(user = "user", roles = "USER")
    void shouldReturnForbiddenForGetAll() {
        given()
                .when()
                .get("/messages")
                .then()
                .statusCode(403);
    }

    @Test
    @DisplayName("Should get all messages when authenticated as OWNER")
    @TestSecurity(user = "admin", roles = Role.Labels.OWNER)
    void shouldGetAllMessagesAsOwner() {
        given()
                .when()
                .get("/messages")
                .then()
                .statusCode(200);
    }
}
