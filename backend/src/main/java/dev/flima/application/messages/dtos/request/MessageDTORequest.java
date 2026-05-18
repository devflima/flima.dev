package dev.flima.application.messages.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MessageDTORequest (
        @NotNull(message = "{username.not_null}")
        @NotBlank(message = "{username.not_null}")
        String username,

        @NotNull(message = "{email.not_null}")
        @NotBlank(message = "{email.not_null}")
        @Email(message = "{email.invalid}")
        String email,

        @NotNull(message = "{message.subject.not_null}")
        @NotBlank(message = "{message.subject.not_null}")
        String subject,

        @NotNull(message = "{message.message.not_null}")
        @NotBlank(message = "{message.message.not_null}")
        String message,

        @NotNull(message = "O aceite da política de privacidade é obrigatório.")
        @jakarta.validation.constraints.AssertTrue(message = "Você deve concordar com a política de privacidade para enviar a mensagem.")
        Boolean lgpdConsent
){}
