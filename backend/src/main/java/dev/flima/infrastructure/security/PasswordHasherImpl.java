package dev.flima.infrastructure.security;

import com.password4j.Argon2Function;
import com.password4j.types.Argon2;
import dev.flima.domain.security.PasswordHasher;
import dev.flima.domain.users.Password;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PasswordHasherImpl implements PasswordHasher {

    private final Argon2Function ARGON2 = Argon2Function.getInstance(
            65536,
            16,
            1,
            32,
            Argon2.ID
    );

    @Override
    public boolean verify(Password plainPassword, Password hashedPassword) {
        try {
            return ARGON2.check(plainPassword.password(), hashedPassword.password());
        }  catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @Override
    public String hash(Password plainPassword) {
        return ARGON2.hash(plainPassword.password()).getResult();
    }
}
