package dev.flima.domain.projects;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository {
    void save(Project project);
    void modify(Project project);
    Optional<Project> getById(UUID id);
    List<Project> getAll();
    void remove(Project project);
}
