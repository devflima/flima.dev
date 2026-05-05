package dev.flima.application.projects.usecases;

import dev.flima.application.projects.dtos.request.ProjectDTORequest;
import dev.flima.application.projects.dtos.response.ProjectDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.projects.Project;
import dev.flima.domain.projects.ProjectRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class UpdateProjectUseCase {

    private final ProjectRepository projectRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public UpdateProjectUseCase(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ProjectDTOResponse execute(UUID id, ProjectDTORequest projectDTO) {
        Project project = projectRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("project.not_found")));

        project.setTitle(projectDTO.title());
        project.setSubtitle(projectDTO.subtitle());
        project.setDescription(projectDTO.description());
        project.setTechnologies(projectDTO.technologies());
        project.setCodeSnippet(projectDTO.codeSnippet());
        project.setIcon(projectDTO.icon());

        projectRepository.modify(project);

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
