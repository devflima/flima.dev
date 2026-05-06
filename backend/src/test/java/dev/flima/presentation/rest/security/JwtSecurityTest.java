package dev.flima.presentation.rest.security;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import io.smallrye.jwt.build.Jwt;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Set;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
class JwtSecurityTest {

    @Test
    @DisplayName("Should reject request with malformed token")
    void shouldRejectMalformedToken() {
        given()
                .header("Authorization", "Bearer this_is_not_a_valid_jwt")
                .when()
                .get("/api/v1/messages")
                .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("Should reject expired token")
    void shouldRejectExpiredToken() {
        // Token expired 1 hour ago
        String expiredToken = Jwt.issuer("https://flima.dev")
                .upn("admin")
                .groups(Set.of("OWNER"))
                .expiresAt(Instant.now().getEpochSecond() - 3600)
                .sign();

        given()
                .header("Authorization", "Bearer " + expiredToken)
                .when()
                .get("/api/v1/messages")
                .then()
                .statusCode(401);
    }

    @Test
    @DisplayName("Should reject token with wrong issuer")
    void shouldRejectWrongIssuer() {
        String wrongIssuerToken = Jwt.issuer("https://hacker.com")
                .upn("admin")
                .groups(Set.of("OWNER"))
                .expiresAt(Instant.now().getEpochSecond() + 3600)
                .sign();

        given()
                .header("Authorization", "Bearer " + wrongIssuerToken)
                .when()
                .get("/api/v1/messages")
                .then()
                .statusCode(401);
    }
}
