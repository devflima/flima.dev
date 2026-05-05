package dev.flima.infrastructure.stacks;

import dev.flima.domain.stacks.StackType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.UUID;

@Entity(name = "stacks")
public class StackPanacheEntity {

    @Id
    public UUID id;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "stack_type", nullable = false)
    @NotNull
    public StackType stackType;

    @ElementCollection
    @CollectionTable(name = "stack_technologies", joinColumns = @JoinColumn(name = "stack_id"))
    @Column(name = "technology")
    @NotEmpty
    public List<String> technologies;

}
