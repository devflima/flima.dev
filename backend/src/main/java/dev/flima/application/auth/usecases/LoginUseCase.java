package dev.flima.application.auth.usecases;

import dev.flima.application.auth.dtos.request.LoginDTORequest;
import dev.flima.application.auth.dtos.response.LoginDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.security.PasswordHasher;
import dev.flima.domain.security.TokenGenerator;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.User;
import dev.flima.domain.users.UserRepository;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ResourceBundle;

@ApplicationScoped
public class LoginUseCase {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;
    private final TokenGenerator tokenGenerator;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public LoginUseCase(UserRepository userRepository, PasswordHasher passwordHasher, TokenGenerator tokenGenerator) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenGenerator = tokenGenerator;
    }

    public LoginDTOResponse execute(LoginDTORequest loginDTO) {
        User user = userRepository.getUsername(loginDTO.username())
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("auth.login_failed")));


        if(!passwordHasher.verify(new Password(loginDTO.password().password()), new Password(user.getPassword().password()))) {
            Log.warnf("Failed login attempt for user: %s", loginDTO.username());
            throw new EntityNotFoundException(messages.getString("auth.login_failed"));
        }

        String token = tokenGenerator.generateToken(user.getUsername(), user.getRole().name());
        Log.infof("User '%s' authenticated successfully", user.getUsername());

        return new LoginDTOResponse(
                user.getUsername(),
                user.getRole(),
                token
        );
    }
}
