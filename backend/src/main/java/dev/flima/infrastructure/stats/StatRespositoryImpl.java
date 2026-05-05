package dev.flima.infrastructure.stats;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stats.Stat;
import dev.flima.domain.stats.StatRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class StatRespositoryImpl implements StatRepository, PanacheRepositoryBase<StatPanacheEntity, UUID> {

    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public void save(Stat stat) {
        StatPanacheEntity entity = new StatPanacheEntity();

        entity.id = stat.getId();
        entity.yearsExperience = stat.getYearsExperience();
        entity.systemDeployed = stat.getSystemDeployed();
        entity.uptimeSLA = stat.getUptimeSLA();
        entity.status = stat.getStatus();
        entity.objective = stat.getObjective();

        persist(entity);
    }

    @Override
    public void modify(Stat stat) {
        StatPanacheEntity entity = findById(stat.getId());

        if(entity == null) {
            throw new EntityNotFoundException(messages.getString("stat.not_found"));
        }

        entity.yearsExperience = stat.getYearsExperience();
        entity.systemDeployed = stat.getSystemDeployed();
        entity.uptimeSLA = stat.getUptimeSLA();
        entity.commitsLogged = stat.getCommitsLogged();
        entity.status = stat.getStatus();
        entity.objective = stat.getObjective();
    }

    @Override
    public Optional<Stat> getById(UUID id) {
        StatPanacheEntity entity = findById(id);

        if(entity == null) {
            throw new EntityNotFoundException(messages.getString("stat.not_found"));
        }

        return Optional.of(new Stat(
                entity.id,
                entity.yearsExperience,
                entity.systemDeployed,
                entity.uptimeSLA,
                entity.commitsLogged,
                entity.status,
                entity.objective
        ));
    }

    @Override
    public List<Stat> getAll() {
        return findAll().list().stream()
                .map(entity -> new Stat(
                        entity.id,
                        entity.yearsExperience,
                        entity.systemDeployed,
                        entity.uptimeSLA,
                        entity.commitsLogged,
                        entity.status,
                        entity.objective
                ))
                .toList();
    }

    @Override
    public void remove(Stat stat) {
        StatPanacheEntity entity = findById(stat.getId());

        if(entity == null) {
            throw new EntityNotFoundException(messages.getString("stat.not_found"));
        }

        delete(entity);
    }
}
