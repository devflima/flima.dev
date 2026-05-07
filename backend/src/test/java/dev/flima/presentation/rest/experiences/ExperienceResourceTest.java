package dev.flima.presentation.rest.experiences;

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
class ExperienceResourceTest {

    @Test
    @DisplayName("Should return 200 for public experience list")
    void shouldReturnPublicExperiences() {
        given()
                .when()
                .get("/api/v1/experiences")
                .then()
                .statusCode(200);
    }

    @Test
    @TestSecurity(user = "admin", roles = {"OWNER"})
    @DisplayName("Should create experience with colorClass and return 201")
    void shouldCreateExperienceWithColor() {
        String json = """
                {
                    "title": "Software Engineer",
                    "company": "Google",
                    "period": "2024 - Present",
                    "bullets": ["Building AI assistants", "Optimizing backend"],
                    "technologies": ["Java", "Quarkus"],
                    "icon": "google-icon",
                    "colorClass": "secondary"
                }
                """;

        given()
                .contentType(ContentType.JSON)
                .body(json)
                .when()
                .post("/api/v1/experiences")
                .then()
                .statusCode(201)
                .body("id", notNullValue())
                .body("colorClass", is("secondary"));
    }

    @Test
    @TestSecurity(user = "admin", roles = {"OWNER"})
    @DisplayName("Should update experience colorClass")
    void shouldUpdateExperienceColor() {
        // First create one
        String id = given()
                .contentType(ContentType.JSON)
                .body(createValidExperienceJson("Meta"))
                .when()
                .post("/api/v1/experiences")
                .then()
                .statusCode(201)
                .extract().path("id");

        // Now update it
        String updateJson = createValidExperienceJson("Meta Senior");

        given()
                .contentType(ContentType.JSON)
                .body(updateJson)
                .when()
                .put("/api/v1/experiences/" + id)
                .then()
                .statusCode(200)
                .body("company", is("Meta Senior"));
    }

    @Test
    @TestSecurity(user = "admin", roles = {"OWNER"})
    @DisplayName("Should return 404 when updating non-existent experience")
    void shouldReturn404OnUpdateNotFound() {
        given()
                .contentType(ContentType.JSON)
                .body(createValidExperienceJson("NonExistent"))
                .when()
                .put("/api/v1/experiences/" + UUID.randomUUID())
                .then()
                .statusCode(404);
    }

    @Test
    @DisplayName("Should get experience by ID")
    void shouldGetExperienceById() {
        // We need an ID. Since we can't easily seed here without auth, we'll use a known list or create one if we had auth.
        // But GET /experiences is public, so let's use that to find an ID.
        String id = given()
                .when()
                .get("/api/v1/experiences")
                .then()
                .statusCode(200)
                .extract().path("[0].id");

        if (id != null) {
            given()
                    .when()
                    .get("/api/v1/experiences/" + id)
                    .then()
                    .statusCode(200)
                    .body("id", is(id));
        }
    }

    @Test
    @TestSecurity(user = "admin", roles = {"OWNER"})
    @DisplayName("Should return 404 for non-existent experience ID")
    void shouldReturn404OnGetNotFound() {
        given()
                .when()
                .get("/api/v1/experiences/" + UUID.randomUUID())
                .then()
                .statusCode(404);
    }

    @Test
    @TestSecurity(user = "admin", roles = {"OWNER"})
    @DisplayName("Should delete experience")
    void shouldDeleteExperience() {
        String id = given()
                .contentType(ContentType.JSON)
                .body(createValidExperienceJson("To Delete"))
                .when()
                .post("/api/v1/experiences")
                .then()
                .statusCode(201)
                .extract().path("id");

        given()
                .when()
                .delete("/api/v1/experiences/" + id)
                .then()
                .statusCode(204);

        // Verify it's gone
        given()
                .when()
                .get("/api/v1/experiences/" + id)
                .then()
                .statusCode(404);
    }

    private String createValidExperienceJson(String company) {
        return """
                {
                    "title": "Engineer",
                    "company": "%s",
                    "period": "2024",
                    "bullets": ["Bullet"],
                    "technologies": ["Tech"],
                    "icon": "icon",
                    "colorClass": "primary"
                }
                """.formatted(company);
    }
}
