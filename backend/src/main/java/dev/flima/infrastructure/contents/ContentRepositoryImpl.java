package dev.flima.infrastructure.contents;

import dev.flima.domain.contents.Content;
import dev.flima.domain.contents.ContentRepository;
import dev.flima.domain.contents.SectionContent;
import dev.flima.domain.exceptions.EntityNotFoundException;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class ContentRepositoryImpl implements ContentRepository, PanacheRepositoryBase<ContentPanacheEntity, UUID> {

    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public void save(Content content) {
        ContentPanacheEntity entity = new ContentPanacheEntity();

        entity.id = content.getId();
        entity.sectionType = content.getSectionType();

        if(content.getSectionContent() != null) {
            entity.content = new SectionContentEmbeddable();
            entity.content.title = content.getSectionContent().title();
            entity.content.subtitle = content.getSectionContent().subtitle();
        }

        persist(entity);
    }

    @Override
    public void modify(Content content) {
        ContentPanacheEntity entity = findById(content.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("content.not_found"));
        }

        entity.sectionType = content.getSectionType();

        if(content.getSectionContent() != null) {
            entity.content = new SectionContentEmbeddable();
            entity.content.title = content.getSectionContent().title();
            entity.content.subtitle = content.getSectionContent().subtitle();
        }
    }

    @Override
    public Optional<Content> getById(UUID id) {
        ContentPanacheEntity entity = findById(id);

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("content.not_found"));
        }

        String contentTitle = entity.content.title;
        String contentSubtitle = entity.content.subtitle;
        SectionContent content = new SectionContent(contentTitle, contentSubtitle);

        return Optional.of(new Content(entity.id, entity.sectionType, content));
    }

    @Override
    public List<Content> getAll() {
        return findAll().list().stream()
                .map(entity -> new Content(
                        entity.id,
                        entity.sectionType,
                        new SectionContent(entity.content.title, entity.content.subtitle)
                ))
                .toList();
    }

    @Override
    public void remove(Content content) {
        ContentPanacheEntity entity = findById(content.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("content.not_found"));
        }

        delete(entity);
    }
}
