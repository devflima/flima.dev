package dev.flima.application.stacks.usecases;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stacks.Stack;
import dev.flima.domain.stacks.StackRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class DeleteStackUseCase {

    private final StackRepository stackRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public DeleteStackUseCase(StackRepository stackRepository) {
        this.stackRepository = stackRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Stack stack = stackRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("stack.not_found")));

        stackRepository.remove(stack);
    }

}
