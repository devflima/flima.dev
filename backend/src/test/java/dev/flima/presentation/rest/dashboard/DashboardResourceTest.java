package dev.flima.presentation.rest.dashboard;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;

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

    @Test
    @DisplayName("Should format uptime correctly for different durations")
    void shouldFormatUptime() {
        DashboardResource resource = new DashboardResource();
        
        // Minutes only
        assertThat(resource.formatUptime(60 * 1000 * 5), is("5m"));
        
        // Hours and minutes
        assertThat(resource.formatUptime(60 * 1000 * 65), is("1h 5m"));
        
        // Days and hours
        assertThat(resource.formatUptime(1000L * 60 * 60 * 25), is("1d 1h"));
    }
}
