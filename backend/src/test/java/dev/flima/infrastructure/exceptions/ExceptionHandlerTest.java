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

    @Test
    @DisplayName("Should cover DatabaseExceptionHandler logging lines directly")
    void testDatabaseExceptionHandler() {
        DatabaseExceptionHandler handler = new DatabaseExceptionHandler();
        
        // 1. ConstraintViolationException
        org.hibernate.exception.ConstraintViolationException cve = new org.hibernate.exception.ConstraintViolationException("duplicate", null, "uk_name");
        jakarta.persistence.PersistenceException pe1 = new jakarta.persistence.PersistenceException(cve);
        jakarta.ws.rs.core.Response res1 = handler.toResponse(pe1);
        org.junit.jupiter.api.Assertions.assertEquals(409, res1.getStatus());

        // 2. Generic PersistenceException
        jakarta.persistence.PersistenceException pe2 = new jakarta.persistence.PersistenceException("generic error");
        jakarta.ws.rs.core.Response res2 = handler.toResponse(pe2);
        org.junit.jupiter.api.Assertions.assertEquals(500, res2.getStatus());

        // 3. Nested ConstraintViolationException
        jakarta.persistence.PersistenceException pe3 = new jakarta.persistence.PersistenceException(new RuntimeException(cve));
        jakarta.ws.rs.core.Response res3 = handler.toResponse(pe3);
        org.junit.jupiter.api.Assertions.assertEquals(409, res3.getStatus());
    }
}
