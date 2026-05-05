package dev.flima.application.stacks.usecases;

import dev.flima.application.stacks.dtos.response.StackDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stacks.Stack;
import dev.flima.domain.stacks.StackRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class GetStackUseCase {

    private final StackRepository stackRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public GetStackUseCase(StackRepository stackRepository) {
        this.stackRepository = stackRepository;
    }

    public StackDTOResponse execute(UUID id) {
        Stack stack = stackRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("stack.not_found")));

        return new StackDTOResponse(
                stack.getId(),
                stack.getStackType(),
                stack.getTechnologies()
        );
    }
}
