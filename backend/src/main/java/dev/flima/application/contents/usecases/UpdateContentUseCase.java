package dev.flima.application.contents.usecases;

import dev.flima.application.contents.dtos.SectionContentDTO;
import dev.flima.application.contents.dtos.request.ContentDTORequest;
import dev.flima.application.contents.dtos.response.ContentDTOResponse;
import dev.flima.domain.contents.Content;
import dev.flima.domain.contents.ContentRepository;
import dev.flima.domain.contents.SectionContent;
import dev.flima.domain.exceptions.EntityNotFoundException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class UpdateContentUseCase {

    private final ContentRepository contentRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public UpdateContentUseCase(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @Transactional
    public ContentDTOResponse execute(UUID id, ContentDTORequest contentDTO) {
        Content content = contentRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("content.not_found")));

        content.setSectionType(contentDTO.sectionType());
        content.setSectionContent(new SectionContent(contentDTO.sectionContent().title(), contentDTO.sectionContent().subtitle()));

        contentRepository.modify(content);

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
