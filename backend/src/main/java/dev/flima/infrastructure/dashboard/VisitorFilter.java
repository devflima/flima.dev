package dev.flima.infrastructure.dashboard;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;
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
        try {
            String path = requestContext.getUriInfo().getPath();
            // Increment only for public portfolio views (contents, projects, experiences, educations, stacks, stats)
            // Skip auth, dashboard, users and messages (admin/internal)
            if (isPublicPath(path)) {
                VisitorCountPanacheEntity entity = em.find(VisitorCountPanacheEntity.class, VISITOR_ID);
                if (entity == null) {
                    entity = new VisitorCountPanacheEntity();
                    em.persist(entity);
                }
                entity.count++;
            }
        } catch (Exception e) {
            // Silently fail to not break the main application flow
            System.err.println("Failed to increment visitor count: " + e.getMessage());
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
