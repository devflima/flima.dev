package dev.flima.infrastructure.experience;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.experience.Experience;
import dev.flima.domain.experience.ExperienceRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class ExperienceRepositoryImpl implements ExperienceRepository, PanacheRepositoryBase<ExperiencePanacheEntity, UUID> {

    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public void save(Experience experience) {
        ExperiencePanacheEntity entity = new ExperiencePanacheEntity();

        entity.id = experience.getId();
        entity.title = experience.getTitle();
        entity.company = experience.getCompany();
        entity.period = experience.getPeriod();
        entity.bullets = experience.getBullets();
        entity.technologies = experience.getTechnologies();
        entity.icon = experience.getIcon();

        persist(entity);
    }

    @Override
    public void modify(Experience experience) {
        ExperiencePanacheEntity entity = findById(experience.getId());

        if(entity == null) {
            throw new EntityNotFoundException(messages.getString("experience.not_found"));
        }

        entity.title = experience.getTitle();
        entity.company = experience.getCompany();
        entity.period = experience.getPeriod();
        entity.bullets = experience.getBullets();
        entity.technologies = experience.getTechnologies();
        entity.icon = experience.getIcon();
    }

    @Override
    public Optional<Experience> getById(UUID id) {
        ExperiencePanacheEntity entity = findById(id);

        if(entity == null) {
            throw new EntityNotFoundException(messages.getString("experience.not_found"));
        }

        return Optional.of(new Experience(
                entity.id,
                entity.title,
                entity.company,
                entity.period,
                entity.bullets,
                entity.technologies,
                entity.icon
        ));
    }

    @Override
    public List<Experience> getAll() {
        return findAll().list().stream()
                .map(entity -> new Experience(
                        entity.id,
                        entity.title,
                        entity.company,
                        entity.period,
                        entity.bullets,
                        entity.technologies,
                        entity.icon
                ))
                .toList();
    }

    @Override
    public void remove(Experience experience) {
        ExperiencePanacheEntity entity = findById(experience.getId());

        if(entity == null) {
            throw new EntityNotFoundException(messages.getString("experience.not_found"));
        }

        delete(entity);
    }
}
