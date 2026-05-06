package dev.flima.infrastructure.monitoring;

import dev.flima.domain.users.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Readiness;

@Readiness
@ApplicationScoped
public class DatabaseHealthCheck implements HealthCheck {

    @Inject
    UserRepository userRepository;

    @Override
    public HealthCheckResponse call() {
        try {
            userRepository.countUsers();
            return HealthCheckResponse.named("PostgreSQL Connection")
                    .up()
                    .withData("database", "PostgreSQL")
                    .build();
        } catch (Exception e) {
            return HealthCheckResponse.named("PostgreSQL Connection")
                    .down()
                    .withData("error", e.getMessage())
                    .build();
        }
    }
}
