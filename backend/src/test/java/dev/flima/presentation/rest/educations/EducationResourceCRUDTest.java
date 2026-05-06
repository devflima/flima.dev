package dev.flima.presentation.rest.educations;

import dev.flima.application.educations.dtos.request.EducationDTORequest;
import dev.flima.application.educations.dtos.response.CreateEducationDTOResponse;
import dev.flima.domain.educations.TypeEducation;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class EducationResourceCRUDTest {

    @Test
    @DisplayName("Should update and delete education entry as OWNER")
    @TestSecurity(user = "admin", roles = Role.Labels.OWNER)
    void shouldUpdateAndDeleteEducation() {
        // 1. Create
        EducationDTORequest request = new EducationDTORequest(
                TypeEducation.CERTIFICATION,
                "Cert",
                "AWS Solutions Architect",
                "Amazon",
                "2023",
                "Cloud",
                List.of("AWS"),
                List.of("Cloud Native")
        );

        CreateEducationDTOResponse createResponse = given()
                .contentType(ContentType.JSON)
                .body(request)
                .post("/api/v1/educations")
                .then()
                .statusCode(201)
                .extract().as(CreateEducationDTOResponse.class);

        UUID id = createResponse.id();

        // 2. Update
        EducationDTORequest updateRequest = new EducationDTORequest(
                TypeEducation.CERTIFICATION,
                "Cert",
                "AWS Solutions Architect Professional",
                "Amazon",
                "2023",
                "Cloud",
                List.of("AWS", "Serverless"),
                List.of("Cloud Native")
        );

        given()
                .contentType(ContentType.JSON)
                .body(updateRequest)
                .put("/api/v1/educations/" + id)
                .then()
                .statusCode(200)
                .body("title", is("AWS Solutions Architect Professional"));

        // 3. Delete
        given()
                .when()
                .delete("/api/v1/educations/" + id)
                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("Should return 401 for update without auth")
    void shouldReturnUnauthorizedForUpdate() {
        given()
                .contentType(ContentType.JSON)
                .body("{}")
                .when()
                .put("/api/v1/educations/" + UUID.randomUUID())
                .then()
                .statusCode(401);
    }
}
