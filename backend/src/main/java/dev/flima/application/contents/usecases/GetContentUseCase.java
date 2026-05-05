package dev.flima.application.contents.usecases;

import dev.flima.application.contents.dtos.SectionContentDTO;
import dev.flima.application.contents.dtos.response.ContentDTOResponse;
import dev.flima.domain.contents.Content;
import dev.flima.domain.contents.ContentRepository;
import dev.flima.domain.exceptions.EntityNotFoundException;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class GetContentUseCase {

    private final ContentRepository contentRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public GetContentUseCase(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public ContentDTOResponse execute(UUID id) {
        Content content = contentRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("content.not_found")));

        return new ContentDTOResponse(
                content.getId(),
                content.getSectionType(),
                new SectionContentDTO(
                        content.getSectionContent().title(),
                        content.getSectionContent().subtitle()
                )
        );
    }

}
