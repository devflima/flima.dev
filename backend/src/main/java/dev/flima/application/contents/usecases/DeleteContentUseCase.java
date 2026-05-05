package dev.flima.application.contents.usecases;

import dev.flima.domain.contents.Content;
import dev.flima.domain.contents.ContentRepository;
import dev.flima.domain.exceptions.EntityNotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class DeleteContentUseCase {

    private final ContentRepository contentRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public DeleteContentUseCase(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Content content = contentRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("content.not_found")));

        contentRepository.remove(content);
    }

}
