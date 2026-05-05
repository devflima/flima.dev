package dev.flima.domain.security;

public interface TokenGenerator {
    String generateToken(String username, String role);
}
