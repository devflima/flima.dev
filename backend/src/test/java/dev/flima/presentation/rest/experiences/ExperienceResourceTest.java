package dev.flima.presentation.rest.experiences;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

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
}
