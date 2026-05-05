package dev.flima.presentation.rest.stats;

import dev.flima.application.stats.dtos.request.StatDTORequest;
import dev.flima.application.stats.dtos.response.CreateStatDTOResponse;
import dev.flima.application.stats.dtos.response.StatDTOResponse;
import dev.flima.application.stats.usecases.*;
import dev.flima.domain.users.Role;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("/stats")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({Role.Labels.OWNER})
public class StatResource {

    private final CreateStatUseCase createStatUseCase;
    private final GetStatUseCase getStatUseCase;
    private final GetAllStatUseCase getAllStatUseCase;
    private final UpdateStatUseCase updateStatUseCase;
    private final DeleteStatUseCase deleteStatUseCase;

    public StatResource(
            CreateStatUseCase createStatUseCase,
            GetStatUseCase getStatUseCase,
            GetAllStatUseCase getAllStatUseCase,
            UpdateStatUseCase updateStatUseCase,
            DeleteStatUseCase deleteStatUseCase
    ) {
        this.createStatUseCase = createStatUseCase;
        this.getStatUseCase = getStatUseCase;
        this.getAllStatUseCase = getAllStatUseCase;
        this.updateStatUseCase = updateStatUseCase;
        this.deleteStatUseCase = deleteStatUseCase;
    }

    @POST
    public Response create(@Valid StatDTORequest statsDTO) {
        CreateStatDTOResponse response = createStatUseCase.execute(statsDTO);
        return Response.status(Response.Status.CREATED).entity(response).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@Valid @PathParam("id") UUID id, StatDTORequest statsDTO) {
        StatDTOResponse response = updateStatUseCase.execute(id, statsDTO);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") UUID id) {
        StatDTOResponse response = getStatUseCase.execute(id);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @PermitAll
    public Response getAll() {
        List<StatDTOResponse> response = getAllStatUseCase.execute();
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") UUID id) {
        deleteStatUseCase.execute(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
