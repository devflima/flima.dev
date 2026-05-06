package dev.flima.infrastructure.exceptions;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
class ExceptionHandlerTest {

    @Test
    @DisplayName("Should return consistent ErrorResponse for DomainException (404)")
    @TestSecurity(user = "admin", roles = "OWNER")
    void shouldReturnConsistentErrorResponse() {
        given()
                .when()
                .get("/api/v1/educations/" + UUID.randomUUID())
                .then()
                .statusCode(404)
                .body("message", is("Education record not found."))
                .body("status", is(404))
                .body("timestamp", notNullValue());
    }
}
