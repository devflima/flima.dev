package dev.flima.application.stacks.usecases;

import dev.flima.application.stacks.dtos.request.StackDTORequest;
import dev.flima.application.stacks.dtos.response.CreateStackDTOResponse;
import dev.flima.domain.stacks.Stack;
import dev.flima.domain.stacks.StackRepository;
import io.quarkus.cache.CacheInvalidateAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CreateStackUseCase {

    private final StackRepository stackRepository;

    public CreateStackUseCase(StackRepository stackRepository) {
        this.stackRepository = stackRepository;
    }

    @Transactional
    @CacheInvalidateAll(cacheName = "stacks-cache")
    public CreateStackDTOResponse execute(StackDTORequest stackDTO) {
        Stack stack = new Stack(stackDTO.stackType(), stackDTO.technologies());

        stackRepository.save(stack);

        return new CreateStackDTOResponse(
                stack.getId()
        );
    }

}
