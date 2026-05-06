package dev.flima.presentation.rest.users;

import dev.flima.application.users.usecases.GetUserUseCase;
import dev.flima.application.users.usecases.CreateUserUseCase;
import dev.flima.application.users.dtos.request.UserDTORequest;
import dev.flima.application.users.dtos.response.UserDTOResponse;
import dev.flima.domain.users.Role;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({ Role.Labels.OWNER })
public class UserResource {

    private final CreateUserUseCase createUserUseCase;
    private final GetUserUseCase getUserUseCase;

    public UserResource(CreateUserUseCase createUserUseCase, GetUserUseCase getUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
    }

    @POST
    @PermitAll
    public Response create(@Valid UserDTORequest userDTO) {
        createUserUseCase.execute(userDTO);
        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/{username}")
    public Response getUser(@PathParam("username") String username) {
        UserDTOResponse response = getUserUseCase.execute(username);
        return Response.status(Response.Status.OK).entity(response).build();
    }

}
