package dev.flima.application.projects.usecases;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.projects.Project;
import dev.flima.domain.projects.ProjectRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class DeleteProjectUseCase {

    private final ProjectRepository projectRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public DeleteProjectUseCase(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Project project = this.projectRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("project.not_found")));

        projectRepository.remove(project);
    }
}
