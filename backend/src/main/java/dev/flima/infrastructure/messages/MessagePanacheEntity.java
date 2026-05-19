package dev.flima.infrastructure.messages;

import dev.flima.domain.messages.StatusMessage;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "messages")
public class MessagePanacheEntity {

    @Id
    public UUID id;

    @Column(nullable = false)
    @NotBlank
    public String username;

    @Column(nullable = false)
    @NotBlank
    public String email;

    @Column(nullable = false)
    @NotBlank
    public String subject;

    @Column(nullable = false)
    @NotBlank
    public String message;

    @Column(nullable = false)
    @NotNull
    public LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(name = "status_message", nullable = false)
    @NotNull
    public StatusMessage statusMessage;

    @Column(name = "lgpd_consent", nullable = false)
    public boolean lgpdConsent;

    @Column(name = "reply_text")
    public String replyText;

    @Column(name = "reply_timestamp")
    public LocalDateTime replyTimestamp;

}
