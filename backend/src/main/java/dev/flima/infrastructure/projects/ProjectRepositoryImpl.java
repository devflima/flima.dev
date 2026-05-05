package dev.flima.infrastructure.projects;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.projects.Project;
import dev.flima.domain.projects.ProjectRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class ProjectRepositoryImpl implements ProjectRepository, PanacheRepositoryBase<ProjectPanacheEntity, UUID> {

    private ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public void save(Project project) {
        ProjectPanacheEntity entity = new ProjectPanacheEntity();

        entity.id = project.getId();
        entity.title = project.getTitle();
        entity.subtitle = project.getSubtitle();
        entity.description = project.getDescription();
        entity.technologies = project.getTechnologies();
        entity.codeSnippet = project.getCodeSnippet();
        entity.icon = project.getIcon();

        persist(entity);
    }

    @Override
    public void modify(Project project) {
        ProjectPanacheEntity entity = findById(project.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("project.not_found"));
        }

        entity.title = project.getTitle();
        entity.subtitle = project.getSubtitle();
        entity.description = project.getDescription();
        entity.technologies = project.getTechnologies();
        entity.codeSnippet = project.getCodeSnippet();
        entity.icon = project.getIcon();
    }

    @Override
    public Optional<Project> getById(UUID id) {
        ProjectPanacheEntity entity = findById(id);

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("project.not_found"));
        }

        return Optional.of(new Project(
                entity.id,
                entity.title,
                entity.subtitle,
                entity.description,
                entity.technologies,
                entity.codeSnippet,
                entity.icon
        ));
    }

    @Override
    public List<Project> getAll() {
        return findAll().list().stream()
                .map(project -> new Project(
                        project.id,
                        project.title,
                        project.subtitle,
                        project.description,
                        project.technologies,
                        project.codeSnippet,
                        project.icon
                ))
                .toList();
    }

    @Override
    public void remove(Project project) {
        ProjectPanacheEntity entity = findById(project.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("project.not_found"));
        }

        delete(entity);
    }
}
