package dev.flima.application.projects.usecases;

import dev.flima.application.projects.dtos.response.ProjectDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.projects.Project;
import dev.flima.domain.projects.ProjectRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class GetProjectUseCase {

    private final ProjectRepository projectRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public GetProjectUseCase(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public ProjectDTOResponse execute(UUID id) {
        Project project = projectRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("project.not_found")));

        return new ProjectDTOResponse(
                project.getId(),
                project.getTitle(),
                project.getSubtitle(),
                project.getDescription(),
                project.getTechnologies(),
                project.getCodeSnippet(),
                project.getIcon()
        );
    }

}
