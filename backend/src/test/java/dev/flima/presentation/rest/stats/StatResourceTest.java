package dev.flima.presentation.rest.stats;

import dev.flima.application.stats.dtos.request.StatDTORequest;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
class StatResourceTest {

    @Test
    @DisplayName("Should return 200 for public stats list")
    void shouldReturnPublicStats() {
        given()
                .when()
                .get("/stats")
                .then()
                .statusCode(200);
    }

    @Test
    @DisplayName("Should return 401 for update without auth")
    void shouldReturnUnauthorizedForUpdate() {
        given()
                .contentType(ContentType.JSON)
                .body("{}")
                .when()
                .put("/stats/id")
                .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("Should return 403 for update as common user")
    @TestSecurity(user = "user", roles = "USER")
    void shouldReturnForbiddenForUpdate() {
        given()
                .contentType(ContentType.JSON)
                .body("{}")
                .when()
                .put("/stats/id")
                .then()
                .statusCode(403);
    }
}
