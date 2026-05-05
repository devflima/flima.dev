package dev.flima.infrastructure.stacks;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stacks.Stack;
import dev.flima.domain.stacks.StackRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class StackRepositoryImpl implements StackRepository, PanacheRepositoryBase<StackPanacheEntity, UUID> {

    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public void save(Stack stack) {
        StackPanacheEntity entity = new StackPanacheEntity();

        entity.id = stack.getId();
        entity.stackType = stack.getStackType();
        entity.technologies = stack.getTechnologies();

        persist(entity);
    }

    @Override
    public void modify(Stack stack) {
        StackPanacheEntity entity = findById(stack.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("stack.not_found"));
        }

        entity.stackType = stack.getStackType();
        entity.technologies = stack.getTechnologies();
    }

    @Override
    public Optional<Stack> getById(UUID id) {
        StackPanacheEntity entity = findById(id);

        if(entity == null) {
            throw new EntityNotFoundException(messages.getString("stack.not_found"));
        }

        return Optional.of(new Stack(entity.id, entity.stackType, entity.technologies));
    }

    @Override
    public List<Stack> getAll() {
        return findAll().list().stream()
                .map(entity -> new Stack(
                        entity.id,
                        entity.stackType,
                        entity.technologies
                ))
                .toList();
    }

    @Override
    public void remove(Stack stack) {
        StackPanacheEntity entity = findById(stack.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("stack.not_found"));
        }

        delete(entity);
    }
}
