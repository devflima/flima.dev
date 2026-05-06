package dev.flima.application.users.usecases;

import dev.flima.application.users.dtos.request.UserDTORequest;
import dev.flima.application.users.dtos.response.UserDTOResponse;
import dev.flima.domain.exceptions.BusinessRuleException;
import dev.flima.domain.security.PasswordHasher;
import dev.flima.domain.users.Password;
import dev.flima.domain.users.User;
import dev.flima.domain.users.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.UUID;

@ApplicationScoped
public class CreateUserUseCase {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;

    public CreateUserUseCase(UserRepository userRepository, PasswordHasher passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    @Transactional
    public UserDTOResponse execute(UserDTORequest userDTO) {
        if (userRepository.countUsers() > 0) {
            throw new BusinessRuleException("System is already initialized. New registrations are disabled.");
        }
        String passwordHashed = passwordHasher.hash(new Password(userDTO.password().password()));

        User user = new User(
                UUID.randomUUID(),
                userDTO.username(),
                userDTO.name(),
                userDTO.lastName(),
                userDTO.email(),
                userDTO.role(),
                new Password(passwordHashed)
        );

        userRepository.save(user);

        return new UserDTOResponse(
                user.getUsername(),
                user.getRole()
        );
    }

}
