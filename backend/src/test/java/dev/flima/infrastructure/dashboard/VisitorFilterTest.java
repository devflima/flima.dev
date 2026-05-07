package dev.flima.infrastructure.dashboard;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

@QuarkusTest
class VisitorFilterTest {

    @Inject
    EntityManager em;

    private static final UUID VISITOR_ID = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @BeforeEach
    @Transactional
    void setup() {
        // Ensure we start with a clean state or known count
        VisitorCountPanacheEntity entity = em.find(VisitorCountPanacheEntity.class, VISITOR_ID);
        if (entity != null) {
            entity.count = 0L;
        } else {
            entity = new VisitorCountPanacheEntity();
            entity.count = 0L;
            em.persist(entity);
        }
    }

    @Test
    @DisplayName("Should increment visitor count for public paths")
    void shouldIncrementOnPublicPath() {
        // Initial count is 0
        
        given()
                .when()
                .get("/api/v1/contents")
                .then()
                .statusCode(200);

        // Check count again
        VisitorCountPanacheEntity entity = em.find(VisitorCountPanacheEntity.class, VISITOR_ID);
        assertThat(entity.count, is(1L));
    }

    @Test
    @DisplayName("Should NOT increment visitor count for private/admin paths")
    void shouldNotIncrementOnPrivatePath() {
        given()
                .when()
                .get("/api/v1/dashboardData")
                .then()
                .statusCode(401); // Unauthorized is fine, filter runs before auth usually or independently

        VisitorCountPanacheEntity entity = em.find(VisitorCountPanacheEntity.class, VISITOR_ID);
        assertThat(entity.count, is(0L));
    }

    @Test
    @DisplayName("Should NOT increment visitor count for POST requests")
    void shouldNotIncrementOnPostRequest() {
        given()
                .when()
                .post("/api/v1/contents")
                .then()
                .statusCode(415); // Unsupported media type is fine, filter should abort early anyway

        VisitorCountPanacheEntity entity = em.find(VisitorCountPanacheEntity.class, VISITOR_ID);
        assertThat(entity.count, is(0L));
    }
}
