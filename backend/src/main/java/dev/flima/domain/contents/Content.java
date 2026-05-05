package dev.flima.domain.contents;

import java.util.UUID;

public class Content {

    private UUID id;
    private SectionType sectionType;
    private SectionContent sectionContent;

    public Content(SectionType sectionType, SectionContent sectionContent) {
        this.id = UUID.randomUUID();
        this.sectionType = sectionType;
        this.sectionContent = sectionContent;
    }

    public Content(UUID id, SectionType sectionType, SectionContent sectionContent) {
        this.id = id;
        this.sectionType = sectionType;
        this.sectionContent = sectionContent;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public SectionType getSectionType() {
        return sectionType;
    }

    public void setSectionType(SectionType sectionType) {
        this.sectionType = sectionType;
    }

    public SectionContent getSectionContent() {
        return sectionContent;
    }

    public void setSectionContent(SectionContent sectionContent) {
        this.sectionContent = sectionContent;
    }
}
