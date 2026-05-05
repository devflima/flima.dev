package dev.flima.domain.experience;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExperienceRepository {
    void save(Experience experience);
    void modify(Experience experience);
    Optional<Experience> getById(UUID id);
    List<Experience> getAll();
    void remove(Experience experience);
}
