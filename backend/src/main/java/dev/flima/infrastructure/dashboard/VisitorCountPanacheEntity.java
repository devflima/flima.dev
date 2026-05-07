package dev.flima.infrastructure.dashboard;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.UUID;

@Entity(name = "visitor_counts")
public class VisitorCountPanacheEntity {
    @Id
    public UUID id;
    public Long count;

    public VisitorCountPanacheEntity() {
        this.id = UUID.fromString("00000000-0000-0000-0000-000000000000");
        this.count = 0L;
    }
}
