package dev.flima.domain.security;

import dev.flima.domain.users.Password;

public interface PasswordHasher {
    boolean verify(Password plainPassword, Password hashedPassword);
    String hash(Password plainPassword);
}
