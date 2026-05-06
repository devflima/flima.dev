package dev.flima.presentation.rest.users;

import dev.flima.application.users.dtos.request.UserDTORequest;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasItem;

@QuarkusTest
class UserValidationTest {

    @Test
    @DisplayName("Should return 400 when creating user with invalid email")
    void shouldReturnErrorForInvalidEmail() {
        UserDTORequest request = new UserDTORequest(
                "invalid_email_user",
                "Invalid",
                "Email",
                "not-an-email",
                Role.OWNER,
                new Password("password123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/users")
                .then()
                .statusCode(400)
                .body("message", is("Validation failed"))
                .body("details", hasItem(is("create.userDTO.email: Please provide a valid email address.")));
    }

    @Test
    @DisplayName("Should return 400 when creating user with short password")
    void shouldReturnErrorForShortPassword() {
        UserDTORequest request = new UserDTORequest(
                "short_pass_user",
                "Short",
                "Pass",
                "short@example.com",
                Role.OWNER,
                new Password("123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/users")
                .then()
                .statusCode(400)
                .body("message", is("Validation failed"))
                .body("details", hasItem(is("create.userDTO.password.password: Password does not meet the minimum security requirements.")));
    }

    @Test
    @DisplayName("Should return 400 when creating user with null fields")
    void shouldReturnErrorForNullFields() {
        UserDTORequest request = new UserDTORequest(
                null,
                "",
                "Last",
                "null@example.com",
                Role.OWNER,
                new Password("password123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/users")
                .then()
                .statusCode(400)
                .body("message", is("Validation failed"));
    }
}
