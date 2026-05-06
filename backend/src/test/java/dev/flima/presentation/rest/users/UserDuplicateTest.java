package dev.flima.presentation.rest.users;

import dev.flima.application.users.dtos.request.UserDTORequest;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
class UserDuplicateTest {

    @Test
    @DisplayName("Should return error when creating user with duplicate username")
    void shouldReturnErrorForDuplicateUsername() {
        UserDTORequest request = new UserDTORequest(
                "duplicate_user",
                "Name",
                "Last",
                "dup1@example.com",
                Role.OWNER,
                new Password("password123")
        );

        // First creation
        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/__users")
                .then()
                .statusCode(201);

        // Second creation with same username, different email
        UserDTORequest request2 = new UserDTORequest(
                "duplicate_user",
                "Name",
                "Last",
                "dup2@example.com",
                Role.OWNER,
                new Password("password123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(request2)
                .when()
                .post("/__users")
                .then()
                .statusCode(409); // Expecting Conflict or similar
    }
}
