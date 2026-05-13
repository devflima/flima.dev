package dev.flima.infrastructure.dashboard;

import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;
import java.time.LocalDate;
import java.util.UUID;

@Provider
@ApplicationScoped
public class VisitorFilter implements ContainerRequestFilter {

    @Inject
    EntityManager em;

    private static final UUID VISITOR_ID = UUID.fromString("00000000-0000-0000-0000-000000000000");

    @Override
    @Transactional
    public void filter(ContainerRequestContext requestContext) throws IOException {
        // Only count visitors on GET requests. Prevents transaction issues on POST/PUT
        if (!requestContext.getMethod().equalsIgnoreCase("GET")) {
            return;
        }

        try {
            String path = requestContext.getUriInfo().getPath();
            // Increment only for public portfolio views (contents, projects, experiences, educations, stacks, stats)
            // Skip auth, dashboard, users and messages (admin/internal)
            if (isPublicPath(path)) {
                // 1. Total hits (existing logic)
                VisitorCountPanacheEntity totalHits = em.find(VisitorCountPanacheEntity.class, VISITOR_ID);
                if (totalHits == null) {
                    totalHits = new VisitorCountPanacheEntity();
                    em.persist(totalHits);
                }
                totalHits.count++;

                // 2. Unique Daily Visitors
                String ip = requestContext.getHeaderString("X-Forwarded-For");
                if (ip == null || ip.isEmpty()) {
                    // Fallback to direct remote address if no proxy header
                    // In Quarkus/JAX-RS we might need to inject HttpFacade or use Vertx request
                    // But for now, we'll try to get it from context if possible
                    ip = "unknown"; 
                } else {
                    ip = ip.split(",")[0].trim();
                }

                LocalDate today = LocalDate.now();
                Long count = (Long) em.createQuery("SELECT COUNT(v) FROM daily_visitors v WHERE v.ipAddress = :ip AND v.visitDate = :today")
                        .setParameter("ip", ip)
                        .setParameter("today", today)
                        .getSingleResult();

                if (count == 0) {
                    DailyVisitorPanacheEntity uniqueVisitor = new DailyVisitorPanacheEntity(ip, today);
                    em.persist(uniqueVisitor);
                }
            }
        } catch (Exception e) {
            // Silently fail to not break the main application flow
            Log.warnf("Failed to increment visitor count: %s", e.getMessage());
        }
    }

    private boolean isPublicPath(String path) {
        return path.contains("contents") || 
               path.contains("projects") || 
               path.contains("experiences") || 
               path.contains("educations") || 
               path.contains("stacks") || 
               path.contains("stats");
    }
}
