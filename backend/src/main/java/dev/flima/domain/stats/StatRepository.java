package dev.flima.domain.stats;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StatRepository {
    void save(Stat stat);
    void modify(Stat stat);
    Optional<Stat> getById(UUID id);
    List<Stat> getAll();
    void remove(Stat stat);
}
