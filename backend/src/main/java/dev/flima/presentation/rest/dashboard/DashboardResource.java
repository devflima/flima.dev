package dev.flima.presentation.rest.dashboard;

import dev.flima.application.dashboard.dtos.DashboardDTO;
import dev.flima.domain.users.Role;
import dev.flima.infrastructure.dashboard.VisitorCountPanacheEntity;
import dev.flima.infrastructure.messages.MessagePanacheEntity;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.lang.management.ManagementFactory;
import java.util.UUID;

@Path("/dashboardData")
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({Role.Labels.OWNER})
public class DashboardResource {

    @Inject
    EntityManager em;

    private static final UUID VISITOR_ID = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @GET
    public DashboardDTO getDashboardData() {
        // 1. Get Unique Visitor Count
        Long totalVisitors = (Long) em.createQuery("SELECT COUNT(v) FROM daily_visitors v")
                .getSingleResult();

        // 2. Get Uptime
        long uptimeMillis = ManagementFactory.getRuntimeMXBean().getUptime();
        String uptime = formatUptime(uptimeMillis);

        // 3. Unread messages count (queried directly)
        Long unreadMessages = (Long) em.createQuery("SELECT COUNT(m) FROM messages m WHERE m.statusMessage = 'UNREAD'")
                .getSingleResult();

        return new DashboardDTO(totalVisitors, uptime, unreadMessages);
    }

    String formatUptime(long millis) {
        long days = java.util.concurrent.TimeUnit.MILLISECONDS.toDays(millis);
        long hours = java.util.concurrent.TimeUnit.MILLISECONDS.toHours(millis) % 24;
        long minutes = java.util.concurrent.TimeUnit.MILLISECONDS.toMinutes(millis) % 60;
        
        if (days > 0) return String.format("%dd %dh", days, hours);
        if (hours > 0) return String.format("%dh %dm", hours, minutes);
        return String.format("%dm", minutes);
    }
}
