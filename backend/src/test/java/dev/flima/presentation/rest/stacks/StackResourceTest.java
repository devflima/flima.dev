package dev.flima.presentation.rest.stacks;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

@QuarkusTest
class StackResourceTest {

    @Test
    @DisplayName("Should return 200 for public stack list")
    void shouldReturnPublicStacks() {
        given()
                .when()
                .get("/api/v1/stacks")
                .then()
                .statusCode(200);
    }
}
