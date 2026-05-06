package dev.flima.presentation.rest.auth;

import dev.flima.application.auth.dtos.request.LoginDTORequest;
import dev.flima.domain.users.Password;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class AuthFailureTest {

    @Test
    @DisplayName("Should return 404 when login fails (wrong username or password)")
    void shouldReturn404ForFailedLogin() {
        LoginDTORequest request = new LoginDTORequest(
                "non_existent_user",
                new Password("wrong_password")
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/auth")
                .then()
                .statusCode(404)
                .body("message", is("Invalid credentials. Please try again."));
    }
}
