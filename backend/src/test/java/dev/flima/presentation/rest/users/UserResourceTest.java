package dev.flima.presentation.rest.users;

import dev.flima.application.users.dtos.request.UserDTORequest;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.Role;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

import jakarta.inject.Inject;
import dev.flima.domain.users.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import jakarta.transaction.Transactional;

@QuarkusTest
class UserResourceTest {

    @Inject
    UserRepository userRepository;

    @BeforeEach
    @Transactional
    void setup() {
        ((dev.flima.infrastructure.users.UserRepositoryImpl)userRepository).deleteAll();
    }

    @Test
    @DisplayName("Should create a user successfully")
    void shouldCreateUser() {
        UserDTORequest request = new UserDTORequest(
                "tester",
                "Test",
                "User",
                "tester@example.com",
                Role.OWNER,
                new Password("password123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/api/v1/users")
                .then()
                .statusCode(201);
    }

    @Test
    @DisplayName("Should get a user when authenticated")
    @TestSecurity(user = "tester", roles = "OWNER")
    void shouldGetUser() {
        // First create a user to ensure it exists in the DB
        UserDTORequest request = new UserDTORequest(
                "tester2",
                "Test",
                "User",
                "tester2@example.com",
                Role.OWNER,
                new Password("password123")
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .post("/api/v1/users");

        given()
                .when()
                .get("/api/v1/users/tester2")
                .then()
                .statusCode(200)
                .body("username", is("tester2"))
                .body("role", is("OWNER"));
    }

    @Test
    @DisplayName("Should return 403 when accessing protected endpoint without proper role")
    @TestSecurity(user = "common", roles = "USER")
    void shouldReturnForbidden() {
        given()
                .when()
                .get("/api/v1/users/tester")
                .then()
                .statusCode(403);
    }
}
