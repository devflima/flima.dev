package dev.flima.presentation.rest.contents;

import dev.flima.application.contents.dtos.request.ContentDTORequest;
import dev.flima.application.contents.dtos.response.ContentDTOResponse;
import dev.flima.application.contents.dtos.response.CreateContentDTOResponse;
import dev.flima.application.contents.usecases.*;
import dev.flima.domain.users.Role;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("/contents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({Role.Labels.OWNER})
public class ContentResource {

    private final CreateContentUseCase createContentUseCase;
    private final UpdateContentUseCase updateContentUseCase;
    private final DeleteContentUseCase deleteContentUseCase;
    private final GetContentUseCase getContentUseCase;
    private final GetAllContentUseCase getAllContentUseCase;

    public ContentResource(
            CreateContentUseCase createContentUseCase,
            UpdateContentUseCase updateContentUseCase,
            DeleteContentUseCase deleteContentUseCase,
            GetContentUseCase getContentUseCase,
            GetAllContentUseCase getAllContentUseCase
    ) {
        this.createContentUseCase = createContentUseCase;
        this.updateContentUseCase = updateContentUseCase;
        this.deleteContentUseCase = deleteContentUseCase;
        this.getContentUseCase = getContentUseCase;
        this.getAllContentUseCase = getAllContentUseCase;
    }

    @POST
    public Response create(@Valid ContentDTORequest contentDTORequest) {
        CreateContentDTOResponse response = createContentUseCase.execute(contentDTORequest);
        return Response.status(Response.Status.CREATED).entity(response).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@Valid @PathParam("id") UUID id, ContentDTORequest contentDTORequest) {
        ContentDTOResponse response = updateContentUseCase.execute(id, contentDTORequest);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") UUID id) {
        ContentDTOResponse response = getContentUseCase.execute(id);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @PermitAll
    public Response getAll() {
        List<ContentDTOResponse> response = getAllContentUseCase.execute();
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") UUID id) {
        deleteContentUseCase.execute(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
