package dev.flima.domain.contents;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ContentRepository {
    void save(Content content);
    void modify(Content content);
    Optional<Content> getById(UUID id);
    List<Content> getAll();
    void remove(Content content);
}
