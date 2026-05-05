package dev.flima.domain.stacks;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StackRepository {
    void save(Stack stack);
    void modify(Stack stack);
    Optional<Stack> getById(UUID id);
    List<Stack> getAll();
    void remove(Stack stack);
}
