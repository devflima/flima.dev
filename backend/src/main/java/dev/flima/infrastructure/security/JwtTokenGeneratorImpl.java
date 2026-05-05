package dev.flima.infrastructure.security;

import dev.flima.domain.security.TokenGenerator;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Duration;
import java.util.Set;

@ApplicationScoped
public class JwtTokenGeneratorImpl implements TokenGenerator {
    @Override
    public String generateToken(String username, String role) {
        return Jwt.issuer("https://flima.dev")
                .upn(username)
                .groups(Set.of(role))
                .expiresIn(Duration.ofMinutes(60))
                .sign();
    }
}
