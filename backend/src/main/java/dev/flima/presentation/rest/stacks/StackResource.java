package dev.flima.presentation.rest.stacks;

import dev.flima.application.stacks.dtos.request.StackDTORequest;
import dev.flima.application.stacks.dtos.response.CreateStackDTOResponse;
import dev.flima.application.stacks.dtos.response.StackDTOResponse;
import dev.flima.application.stacks.usecases.*;
import dev.flima.domain.users.Role;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("/stacks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({Role.Labels.OWNER})
public class StackResource {

    private final CreateStackUseCase createStackUseCase;
    private final UpdateStackUseCase updateStackUseCase;
    private final DeleteStackUseCase deleteStackUseCase;
    private final GetStackUseCase getStackUseCase;
    private final GetAllStackUseCase getAllStackUseCase;

    public StackResource(
            CreateStackUseCase createStackUseCase,
            UpdateStackUseCase updateStackUseCase,
            DeleteStackUseCase deleteStackUseCase,
            GetStackUseCase getStackUseCase,
            GetAllStackUseCase getAllStackUseCase
    ) {
        this.createStackUseCase = createStackUseCase;
        this.updateStackUseCase = updateStackUseCase;
        this.deleteStackUseCase = deleteStackUseCase;
        this.getStackUseCase = getStackUseCase;
        this.getAllStackUseCase = getAllStackUseCase;
    }

    @POST
    public Response create(@Valid StackDTORequest stackDTO) {
        CreateStackDTOResponse response = createStackUseCase.execute(stackDTO);
        return Response.status(Response.Status.CREATED).entity(response).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@Valid @PathParam("id") UUID id, StackDTORequest stackDTO) {
        StackDTOResponse response = updateStackUseCase.execute(id, stackDTO);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") UUID id) {
        StackDTOResponse response = getStackUseCase.execute(id);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @PermitAll
    public Response getAll() {
        List<StackDTOResponse> list = getAllStackUseCase.execute();
        return Response.status(Response.Status.OK).entity(list).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") UUID id) {
        deleteStackUseCase.execute(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
