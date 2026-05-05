package dev.flima.presentation.rest.educations;

import dev.flima.application.educations.dtos.request.EducationDTORequest;
import dev.flima.application.educations.dtos.response.CreateEducationDTOResponse;
import dev.flima.application.educations.dtos.response.EducationDTOResponse;
import dev.flima.application.educations.usecases.*;
import dev.flima.domain.users.Role;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("/educations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({Role.Labels.OWNER})
public class EducationResource {

    private final CreateEducationUseCase createEducationUseCase;
    private final UpdateEducationUseCase updateEducationUseCase;
    private final DeleteEducationUseCase deleteEducationUseCase;
    private final GetEducationUseCase getEducationUseCase;
    private final GetAllEducationUseCase getAllEducationUseCase;

    public EducationResource(
            CreateEducationUseCase createEducationUseCase,
            UpdateEducationUseCase updateEducationUseCase,
            DeleteEducationUseCase deleteEducationUseCase,
            GetEducationUseCase getEducationUseCase,
            GetAllEducationUseCase getAllEducationUseCase
    ) {
        this.createEducationUseCase = createEducationUseCase;
        this.updateEducationUseCase = updateEducationUseCase;
        this.deleteEducationUseCase = deleteEducationUseCase;
        this.getEducationUseCase = getEducationUseCase;
        this.getAllEducationUseCase = getAllEducationUseCase;
    }

    @POST
    public Response create(@Valid EducationDTORequest educationDTO) {
        CreateEducationDTOResponse response = createEducationUseCase.execute(educationDTO);
        return Response.status(Response.Status.CREATED).entity(response).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@Valid @PathParam("id") UUID id, EducationDTORequest educationDTO) {
        EducationDTOResponse response = updateEducationUseCase.execute(id, educationDTO);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") UUID id) {
        EducationDTOResponse response = getEducationUseCase.execute(id);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @PermitAll
    public Response getAll() {
        List<EducationDTOResponse> response = getAllEducationUseCase.execute();
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") UUID id) {
        deleteEducationUseCase.execute(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
