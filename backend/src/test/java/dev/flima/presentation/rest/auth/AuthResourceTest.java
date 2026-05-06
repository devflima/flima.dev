package dev.flima.presentation.rest.auth;

import dev.flima.application.auth.dtos.request.LoginDTORequest;
import dev.flima.application.users.dtos.request.UserDTORequest;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
class AuthResourceTest {

    @Test
    @DisplayName("Should login successfully and return token")
    void shouldLoginSuccessfully() {
        // 1. Create a user
        UserDTORequest userRequest = new UserDTORequest(
                "auth_tester",
                "Auth",
                "Tester",
                "auth@example.com",
                Role.OWNER,
                new Password("secret123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(userRequest)
                .post("/api/v1/users")
                .then()
                .statusCode(201);

        // 2. Try to login
        LoginDTORequest loginRequest = new LoginDTORequest(
                "auth_tester",
                new Password("secret123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when()
                .post("/api/v1/auth")
                .then()
                .statusCode(202)
                .body("username", is("auth_tester"))
                .body("token", notNullValue());
    }

    @Test
    @DisplayName("Should return 404 for invalid credentials")
    void shouldReturnErrorForInvalidLogin() {
        LoginDTORequest loginRequest = new LoginDTORequest(
                "nonexistent",
                new Password("wrongpassword")
        );

        given()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when()
                .post("/api/v1/auth")
                .then()
                .statusCode(404);
    }
}
