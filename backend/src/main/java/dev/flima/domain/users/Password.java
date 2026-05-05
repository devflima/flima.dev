package dev.flima.domain.users;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record Password(
        @NotNull(message = "{user.password.not_null}")
        @NotBlank(message = "{user.password.not_null}")
        @Size(message = "{user.password.weak}", min = 6)
        String password
) {
    @JsonCreator
    public Password(String password) {
        this.password = password;
    }

    @JsonValue
    public String password() {
        return password;
    }
}
