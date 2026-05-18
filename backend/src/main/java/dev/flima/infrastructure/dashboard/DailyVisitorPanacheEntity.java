package dev.flima.infrastructure.dashboard;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "daily_visitors")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"visitor_id", "visit_date"}))
public class DailyVisitorPanacheEntity {
    @Id
    public UUID id;

    @jakarta.persistence.Column(name = "visitor_id")
    public String visitorId;

    @jakarta.persistence.Column(name = "visit_date")
    public LocalDate visitDate;

    public DailyVisitorPanacheEntity() {}

    public DailyVisitorPanacheEntity(String visitorId, LocalDate visitDate) {
        this.id = UUID.randomUUID();
        this.visitorId = visitorId;
        this.visitDate = visitDate;
    }
}
