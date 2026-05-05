package dev.flima.infrastructure.experience;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

@Entity(name = "experiences")
public class ExperiencePanacheEntity {

    @Id
    public UUID id;

    @Column(nullable = false)
    @NotBlank
    public String title;

    @Column(nullable = false)
    @NotBlank
    public String company;

    @Column(nullable = false)
    @NotBlank
    public String period;

    @ElementCollection
    @CollectionTable(name = "experience_bullets", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "bullet")
    @NotEmpty
    public List<String> bullets;

    @ElementCollection
    @CollectionTable(name = "experience_technologies", joinColumns = @JoinColumn(name = "experience_id"))
    @Column(name = "technology")
    @NotEmpty
    public List<String> technologies;

    @Column(nullable = false)
    @NotBlank
    public String icon;

}
