package dev.flima.infrastructure.educations;

import dev.flima.domain.educations.TypeEducation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity(name = "educations")
public class EducationPanacheEntity {

    @Id
    public UUID id;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "education_type", nullable = false)
    @NotNull
    public TypeEducation typeEducation;

    @Column(nullable = false)
    @NotBlank
    public String degree;

    @Column(nullable = false)
    @NotBlank
    public String title;

    @Column(nullable = false)
    @NotBlank
    public String institution;

    @Column(nullable = false)
    @NotBlank
    public String period;

    @Column(nullable = false)
    @NotBlank
    public String specialization;

    @ElementCollection
    @CollectionTable(name = "education_skills", joinColumns = @JoinColumn(name = "education_id"))
    @Column(name = "skill")
    @NotEmpty
    public List<String> skills;

    @ElementCollection
    @CollectionTable(name = "education_architectures", joinColumns = @JoinColumn(name = "education_id"))
    @Column(name = "architecture")
    @NotEmpty
    public List<String> architectures;

}
