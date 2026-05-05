package dev.flima.application.stacks.usecases;

import dev.flima.application.stacks.dtos.response.StackDTOResponse;
import dev.flima.domain.stacks.Stack;
import dev.flima.domain.stacks.StackRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class GetAllStackUseCase {

    private final StackRepository stackRepository;

    public GetAllStackUseCase(StackRepository stackRepository) {
        this.stackRepository = stackRepository;
    }

    public List<StackDTOResponse> execute() {
        List<Stack> stacks = stackRepository.getAll();

        return stacks.stream()
                .map(stack -> new StackDTOResponse(
                        stack.getId(),
                        stack.getStackType(),
                        stack.getTechnologies()
                ))
                .toList();
    }
}
