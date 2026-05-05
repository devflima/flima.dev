package dev.flima.application.stacks.usecases;

import dev.flima.application.stacks.dtos.request.StackDTORequest;
import dev.flima.application.stacks.dtos.response.StackDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stacks.Stack;
import dev.flima.domain.stacks.StackRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class UpdateStackUseCase {

    private final StackRepository stackRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public UpdateStackUseCase(StackRepository stackRepository) {
        this.stackRepository = stackRepository;
    }

    @Transactional
    public StackDTOResponse execute(UUID id, StackDTORequest stackDTO) {
        Stack stack = stackRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("stack.not_found")));

        stack.setStackType(stackDTO.stackType());
        stack.setTechnologies(stackDTO.technologies());

        stackRepository.modify(stack);

        return new StackDTOResponse(
                stack.getId(),
                stack.getStackType(),
                stack.getTechnologies()
        );
    }

}
