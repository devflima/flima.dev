package dev.flima.infrastructure.users;

import dev.flima.domain.users.Role;
import io.smallrye.common.constraint.NotNull;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity(name = "users")
public class UserPanacheEntity {

    @Id
    public UUID id;

    @Column(nullable = false)
    @NotBlank
    public String username;

    @Column(nullable = false)
    @NotBlank
    public String name;

    @Column(name = "last_name", nullable = false)
    @NotBlank
    public String lastName;

    @Column(nullable = false)
    @NotBlank
    public String email;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false)
    @NotNull
    public Role role;

    @Column(nullable = false)
    @NotBlank
    public String password;

}
