package dev.flima.presentation.rest.dashboard;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;

@QuarkusTest
class DashboardResourceTest {

    @Test
    @DisplayName("Should return 401 when accessing dashboard without authentication")
    void shouldReturn401WhenUnauthorized() {
        given()
                .when()
                .get("/api/v1/dashboardData")
                .then()
                .statusCode(401);
    }

    @Test
    @TestSecurity(user = "admin", roles = {"OWNER"})
    @DisplayName("Should return dashboard data when authenticated as OWNER")
    void shouldReturnDashboardDataWhenAuthorized() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/v1/dashboardData")
                .then()
                .statusCode(200)
                .body("totalVisitors", notNullValue())
                .body("uptime", notNullValue())
                .body("unreadMessages", notNullValue());
    }
}
