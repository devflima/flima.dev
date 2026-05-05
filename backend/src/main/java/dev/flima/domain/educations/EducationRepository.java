package dev.flima.domain.educations;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EducationRepository {
    void save(Education education);
    void modify(Education education);
    Optional<Education> getById(UUID id);
    List<Education> getAll();
    void remove(Education education);
}
