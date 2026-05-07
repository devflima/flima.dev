package dev.flima.presentation.rest.stats;

import dev.flima.application.stats.dtos.request.StatDTORequest;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
class StatResourceTest {

    @Test
    @DisplayName("Should return 200 for public stats list")
    void shouldReturnPublicStats() {
        given()
                .when()
                .get("/api/v1/stats")
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
                .put("/api/v1/stats/id")
                .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("Should update stats as OWNER and return 200")
    @TestSecurity(user = "admin", roles = Role.Labels.OWNER)
    void shouldUpdateStatsAsOwner() {
        String createJson = """
                {
                    "yearsExperience": "5+",
                    "systemDeployed": "10+",
                    "uptimeSLA": "99.0%",
                    "commitsLogged": "5k+",
                    "status": "Online",
                    "objective": "Old Objective"
                }
                """;

        // First create one
        String id = given()
                .contentType(ContentType.JSON)
                .body(createJson)
                .when()
                .post("/api/v1/stats")
                .then()
                .statusCode(201)
                .extract().path("id");

        String updateJson = """
                {
                    "yearsExperience": "10+",
                    "systemDeployed": "50+",
                    "uptimeSLA": "99.9%",
                    "commitsLogged": "15k+",
                    "status": "Online",
                    "objective": "New Objective"
                }
                """;

        given()
                .contentType(ContentType.JSON)
                .body(updateJson)
                .when()
                .put("/api/v1/stats/" + id)
                .then()
                .statusCode(200)
                .body("yearsExperience", is("10+"))
                .body("commitsLogged", is("15k+"));
    }

    @Test
    @TestSecurity(user = "admin", roles = Role.Labels.OWNER)
    @DisplayName("Should return 404 when updating non-existent stats")
    void shouldReturn404OnUpdateNotFound() {
        given()
                .contentType(ContentType.JSON)
                .body(createValidStatJson("7y"))
                .when()
                .put("/api/v1/stats/" + UUID.randomUUID())
                .then()
                .statusCode(404);
    }

    @Test
    @TestSecurity(user = "admin", roles = Role.Labels.OWNER)
    @DisplayName("Should return 404 for non-existent stat ID")
    void shouldReturn404OnGetNotFound() {
        given()
                .when()
                .get("/api/v1/stats/" + UUID.randomUUID())
                .then()
                .statusCode(404);
    }

    @Test
    @TestSecurity(user = "admin", roles = Role.Labels.OWNER)
    @DisplayName("Should delete stats")
    void shouldDeleteStats() {
        String id = given()
                .contentType(ContentType.JSON)
                .body(createValidStatJson("5y"))
                .when()
                .post("/api/v1/stats")
                .then()
                .statusCode(201)
                .extract().path("id");

        given()
                .when()
                .delete("/api/v1/stats/" + id)
                .then()
                .statusCode(204);
    }

    private String createValidStatJson(String years) {
        return """
                {
                    "yearsExperience": "%s",
                    "systemDeployed": "10",
                    "uptimeSLA": "99.0",
                    "commitsLogged": "1k",
                    "status": "active",
                    "objective": "obj"
                }
                """.formatted(years);
    }
}
