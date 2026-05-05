package dev.flima.presentation.rest.auth;

import dev.flima.application.auth.dtos.request.LoginDTORequest;
import dev.flima.application.auth.dtos.response.LoginDTOResponse;
import dev.flima.application.auth.usecases.LoginUseCase;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    private final LoginUseCase loginUseCase;

    public AuthResource(LoginUseCase loginUseCase) {
        this.loginUseCase = loginUseCase;
    }

    @POST
    public Response login(@Valid LoginDTORequest loginDTO) {
        LoginDTOResponse response = loginUseCase.execute(loginDTO);
        return Response.status(Response.Status.ACCEPTED).entity(response).build();
    }

}
