package dev.flima.presentation.rest.projects;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
class ProjectResourceTest {

    @Test
    @DisplayName("Should return 200 for public project list")
    void shouldReturnPublicProjects() {
        given()
                .when()
                .get("/projects")
                .then()
                .statusCode(200);
    }

    @Test
    @DisplayName("Should return 401 for protected creation without auth")
    void shouldReturnUnauthorizedForCreate() {
        given()
                .contentType(ContentType.JSON)
                .body("{}")
                .when()
                .post("/projects")
                .then()
                .statusCode(401);
    }
}
