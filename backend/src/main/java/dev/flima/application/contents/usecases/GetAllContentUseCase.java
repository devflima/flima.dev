package dev.flima.application.contents.usecases;

import dev.flima.application.contents.dtos.SectionContentDTO;
import dev.flima.application.contents.dtos.response.ContentDTOResponse;
import dev.flima.domain.contents.Content;
import dev.flima.domain.contents.ContentRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class GetAllContentUseCase {

    private final ContentRepository contentRepository;

    public GetAllContentUseCase(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public List<ContentDTOResponse> execute() {
        List<Content> contents = contentRepository.getAll();

        return contents.stream()
                .map(content -> new ContentDTOResponse(
                        content.getId(),
                        content.getSectionType(),
                        new SectionContentDTO(
                                content.getSectionContent().title(),
                                content.getSectionContent().subtitle()
                        )
                ))
                .toList();
    }

}
