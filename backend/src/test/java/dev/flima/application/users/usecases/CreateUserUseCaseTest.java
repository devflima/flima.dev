package dev.flima.application.users.usecases;

import dev.flima.application.users.dtos.request.UserDTORequest;
import dev.flima.application.users.dtos.response.UserDTOResponse;
import dev.flima.domain.security.PasswordHasher;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.Role;
import dev.flima.domain.users.User;
import dev.flima.domain.users.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateUserUseCaseTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordHasher passwordHasher;

    private CreateUserUseCase createUserUseCase;

    @BeforeEach
    void setUp() {
        createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher);
    }

    @Test
    @DisplayName("Should create a user successfully")
    void shouldCreateUserSuccessfully() {
        // Arrange
        String passwordRaw = "password123";
        String passwordHashed = "hashed_password";
        UserDTORequest request = new UserDTORequest(
                "johndoe",
                "John",
                "Doe",
                "john@example.com",
                Role.OWNER,
                new Password(passwordRaw)
        );

        when(passwordHasher.hash(any(Password.class))).thenReturn(passwordHashed);

        // Act
        UserDTOResponse response = createUserUseCase.execute(request);

        // Assert
        assertNotNull(response);
        assertEquals("johndoe", response.username());
        assertEquals(Role.OWNER, response.role());

        // Verify repository interaction
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository, times(1)).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertEquals("johndoe", savedUser.getUsername());
        assertEquals("John", savedUser.getName());
        assertEquals("Doe", savedUser.getLastName());
        assertEquals("john@example.com", savedUser.getEmail());
        assertEquals(Role.OWNER, savedUser.getRole());
        assertEquals(passwordHashed, savedUser.getPassword().password());
        
        verify(passwordHasher, times(1)).hash(any(Password.class));
    }
}
