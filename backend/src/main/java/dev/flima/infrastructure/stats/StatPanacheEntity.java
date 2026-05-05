package dev.flima.infrastructure.stats;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

@Entity(name = "stats")
public class StatPanacheEntity {

    @Id
    public UUID id;

    @Column(nullable = false)
    @NotBlank
    public String yearsExperience;

    @Column(nullable = false)
    @NotBlank
    public String systemDeployed;

    @Column(nullable = false)
    @NotBlank
    public String uptimeSLA;

    @Column(nullable = false)
    @NotBlank
    public String commitsLogged;

    @Column(nullable = false)
    @NotBlank
    public String status;

    @Column(nullable = false)
    @NotBlank
    public String objective;

}
