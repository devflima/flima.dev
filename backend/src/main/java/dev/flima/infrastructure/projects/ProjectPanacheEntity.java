package dev.flima.infrastructure.projects;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

@Entity(name = "projects")
public class ProjectPanacheEntity {

    @Id
    public UUID id;

    @Column(nullable = false)
    @NotBlank
    public String title;

    @Column(nullable = false)
    @NotBlank
    public String subtitle;

    @Column(nullable = false)
    @NotBlank
    public String description;

    @ElementCollection
    @CollectionTable(name = "project_technologies", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    @NotEmpty
    public List<String> technologies;

    public String codeSnippet;
    public String icon;

}
