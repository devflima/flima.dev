package dev.flima.presentation.rest.projects;

import dev.flima.application.projects.dtos.request.ProjectDTORequest;
import dev.flima.application.projects.dtos.response.CreateProjectDTOResponse;
import dev.flima.application.projects.dtos.response.ProjectDTOResponse;
import dev.flima.application.projects.usecases.*;
import dev.flima.domain.users.Role;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("/projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({Role.Labels.OWNER})
public class ProjectResource {

    private final CreateProjectUseCase createProjectUseCase;
    private final UpdateProjectUseCase updateProjectUseCase;
    private final DeleteProjectUseCase deleteProjectUseCase;
    private final GetProjectUseCase getProjectUseCase;
    private final GetAllProjectsUseCase getAllProjectsUseCase;

    public ProjectResource(CreateProjectUseCase createProjectUseCase,
                           UpdateProjectUseCase updateProjectUseCase,
                           DeleteProjectUseCase deleteProjectUseCase,
                           GetProjectUseCase getProjectUseCase,
                           GetAllProjectsUseCase getAllProjectsUseCase
    ) {
        this.createProjectUseCase = createProjectUseCase;
        this.updateProjectUseCase = updateProjectUseCase;
        this.deleteProjectUseCase = deleteProjectUseCase;
        this.getProjectUseCase = getProjectUseCase;
        this.getAllProjectsUseCase = getAllProjectsUseCase;
    }

    @POST
    public Response create(@Valid ProjectDTORequest projectDTO) {
        CreateProjectDTOResponse response = createProjectUseCase.execute(projectDTO);
        return Response.status(Response.Status.CREATED).entity(response).build();
    }

    @PUT
    @Path("{id}")
    public Response update(@Valid @PathParam("id") UUID id, ProjectDTORequest projectDTO) {
        ProjectDTOResponse response = updateProjectUseCase.execute(id, projectDTO);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @Path("{id}")
    public Response getById(@PathParam("id") UUID id) {
        ProjectDTOResponse response = getProjectUseCase.execute(id);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @PermitAll
    public Response getAll() {
        List<ProjectDTOResponse>  response = getAllProjectsUseCase.execute();
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") UUID id) {
        deleteProjectUseCase.execute(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
