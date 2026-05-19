package dev.flima.application.projects.usecases;

import dev.flima.application.projects.dtos.request.ProjectDTORequest;
import dev.flima.application.projects.dtos.response.CreateProjectDTOResponse;
import dev.flima.domain.projects.Project;
import dev.flima.domain.projects.ProjectRepository;
import io.quarkus.cache.CacheInvalidateAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CreateProjectUseCase {

    private final ProjectRepository projectRepository;

    public CreateProjectUseCase(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional
    @CacheInvalidateAll(cacheName = "projects-cache")
    public CreateProjectDTOResponse execute(ProjectDTORequest projectDTO) {
        Project project = new Project(
                projectDTO.title(),
                projectDTO.subtitle(),
                projectDTO.description(),
                projectDTO.technologies(),
                projectDTO.codeSnippet(),
                projectDTO.icon()
        );

        projectRepository.save(project);

        return new CreateProjectDTOResponse(
                project.getId(),
                project.getTitle()
        );
    }

}
