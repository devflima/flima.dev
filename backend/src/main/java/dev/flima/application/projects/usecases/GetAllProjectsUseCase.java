package dev.flima.application.projects.usecases;

import dev.flima.application.projects.dtos.response.ProjectDTOResponse;
import dev.flima.domain.projects.ProjectRepository;
import io.quarkus.cache.CacheResult;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class GetAllProjectsUseCase {

    private final ProjectRepository projectRepository;

    public GetAllProjectsUseCase(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @CacheResult(cacheName = "projects-cache")
    public List<ProjectDTOResponse> execute() {
        return projectRepository.getAll().stream()
                .map(project -> new ProjectDTOResponse(
                        project.getId(),
                        project.getTitle(),
                        project.getSubtitle(),
                        project.getDescription(),
                        project.getTechnologies(),
                        project.getCodeSnippet(),
                        project.getIcon()
                )).toList();
    }

}
