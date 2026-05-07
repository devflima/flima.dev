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
        String json = """
                {
                    "title": "Engineer",
                    "company": "Meta",
                    "period": "2023",
                    "bullets": ["Metaverse stuff"],
                    "technologies": ["React"],
                    "icon": "meta-icon",
                    "colorClass": "primary"
                }
                """;

        String id = given()
                .contentType(ContentType.JSON)
                .body(json)
                .when()
                .post("/api/v1/experiences")
                .then()
                .statusCode(201)
                .extract().path("id");

        // Now update it
        String updateJson = """
                {
                    "title": "Senior Engineer",
                    "company": "Meta",
                    "period": "2023-2024",
                    "bullets": ["Metaverse AI", "Llama 3"],
                    "technologies": ["React", "PyTorch"],
                    "icon": "meta-icon-new",
                    "colorClass": "surface-variant"
                }
                """;

        given()
                .contentType(ContentType.JSON)
                .body(updateJson)
                .when()
                .put("/api/v1/experiences/" + id)
                .then()
                .statusCode(200)
                .body("colorClass", is("surface-variant"))
                .body("title", is("Senior Engineer"));
    }
}
