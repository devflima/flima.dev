package dev.flima.application.contents.usecases;

import dev.flima.application.contents.dtos.request.ContentDTORequest;
import dev.flima.application.contents.dtos.response.CreateContentDTOResponse;
import dev.flima.domain.contents.Content;
import dev.flima.domain.contents.ContentRepository;
import dev.flima.domain.contents.SectionContent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CreateContentUseCase {

    private final ContentRepository contentRepository;

    public CreateContentUseCase(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @Transactional
    public CreateContentDTOResponse execute(ContentDTORequest contentDTO) {
        SectionContent sectionContent = new SectionContent(contentDTO.sectionContent().title(), contentDTO.sectionContent().subtitle());

        Content content = new Content(contentDTO.sectionType(), sectionContent);

        contentRepository.save(content);

        return new CreateContentDTOResponse(
                content.getId(),
                sectionContent.title()
        );
    }

}
