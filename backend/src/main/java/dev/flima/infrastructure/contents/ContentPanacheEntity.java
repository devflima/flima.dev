package dev.flima.infrastructure.contents;

import dev.flima.domain.contents.SectionType;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity(name = "contents")
public class ContentPanacheEntity extends PanacheEntityBase {
    @Id
    public UUID id;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "section_type", nullable = false)
    @NotNull
    public SectionType sectionType;

    @Embedded
    @Column(nullable = false)
    public SectionContentEmbeddable content;
}