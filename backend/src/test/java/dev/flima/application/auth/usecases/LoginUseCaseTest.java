package dev.flima.application.auth.usecases;

import dev.flima.application.auth.dtos.request.LoginDTORequest;
import dev.flima.application.auth.dtos.response.LoginDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.security.PasswordHasher;
import dev.flima.domain.security.TokenGenerator;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.Role;
import dev.flima.domain.users.User;
import dev.flima.domain.users.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class LoginUseCaseTest {

    @Test
    @DisplayName("Should login successfully and log info")
    void testLoginSuccess() {
        UserRepository repo = Mockito.mock(UserRepository.class);
        PasswordHasher hasher = Mockito.mock(PasswordHasher.class);
        TokenGenerator tokenGen = Mockito.mock(TokenGenerator.class);

        User mockUser = new User(java.util.UUID.randomUUID(), "tester", "Test", "User", "test@example.com", Role.OWNER, new Password("hashedPass"));
        Mockito.when(repo.getUsername("tester")).thenReturn(Optional.of(mockUser));
        Mockito.when(hasher.verify(ArgumentMatchers.any(Password.class), ArgumentMatchers.any(Password.class))).thenReturn(true);
        Mockito.when(tokenGen.generateToken("tester", "OWNER")).thenReturn("mockToken");

        LoginUseCase useCase = new LoginUseCase(repo, hasher, tokenGen);

        LoginDTOResponse response = useCase.execute(new LoginDTORequest("tester", new Password("plainPass")));

        assertNotNull(response);
        assertEquals("mockToken", response.token());
    }

    @Test
    @DisplayName("Should fail login on invalid password and log warning")
    void testLoginInvalidPassword() {
        UserRepository repo = Mockito.mock(UserRepository.class);
        PasswordHasher hasher = Mockito.mock(PasswordHasher.class);
        TokenGenerator tokenGen = Mockito.mock(TokenGenerator.class);

        User mockUser = new User(java.util.UUID.randomUUID(), "tester", "Test", "User", "test@example.com", Role.OWNER, new Password("hashedPass"));
        Mockito.when(repo.getUsername("tester")).thenReturn(Optional.of(mockUser));
        Mockito.when(hasher.verify(ArgumentMatchers.any(Password.class), ArgumentMatchers.any(Password.class))).thenReturn(false);

        LoginUseCase useCase = new LoginUseCase(repo, hasher, tokenGen);

        LoginDTORequest request = new LoginDTORequest("tester", new Password("wrongPass"));
        assertThrows(EntityNotFoundException.class, () -> useCase.execute(request));
    }
}
