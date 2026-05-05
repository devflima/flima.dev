package dev.flima.application.users.usecases;

import dev.flima.application.users.dtos.response.UserDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.users.User;
import dev.flima.domain.users.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ResourceBundle;

@ApplicationScoped
public class GetUserUseCase {

    private final UserRepository userRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public  GetUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTOResponse execute(String username) {
        User user = userRepository.getUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("user.not_found")));

        return new UserDTOResponse(
                user.getUsername(),
                user.getRole()
        );
    }

}
