package dev.flima.presentation.rest.messages;

import dev.flima.application.messages.dtos.request.MessageDTORequest;
import dev.flima.application.messages.dtos.request.RepliedMessageDTORequest;
import dev.flima.application.messages.dtos.response.MessageDTOResponse;
import dev.flima.application.messages.usecases.*;
import dev.flima.domain.users.Role;
import dev.flima.infrastructure.messaging.ContactMessagingAdapter;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("/messages")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({Role.Labels.OWNER})
public class MessageResource {

    private final CreateMessageUseCase createMessageUseCase;
    private final GetMessageUseCase getMessageUseCase;
    private final GetAllMessageUseCase getAllMessageUseCase;
    private final DeleteMessaUseCase deleteMessageUseCase;
    private final RepliedMessageUseCase repliedMessageUseCase;
    private final ReadMessageUseCase readMessageUseCase;
    private final GetMessagesCountUseCase getMessagesCountUseCase;

    public MessageResource(
            CreateMessageUseCase createMessageUseCase,
            GetMessageUseCase getMessageUseCase,
            GetAllMessageUseCase getAllMessageUseCase,
            DeleteMessaUseCase deleteMessageUseCase,
            RepliedMessageUseCase repliedMessageUseCase,
            ReadMessageUseCase readMessageUseCase,
            GetMessagesCountUseCase getMessagesCountUseCase
    ) {
        this.createMessageUseCase = createMessageUseCase;
        this.getMessageUseCase = getMessageUseCase;
        this.getAllMessageUseCase = getAllMessageUseCase;
        this.deleteMessageUseCase = deleteMessageUseCase;
        this.repliedMessageUseCase = repliedMessageUseCase;
        this.readMessageUseCase = readMessageUseCase;
        this.getMessagesCountUseCase = getMessagesCountUseCase;
    }

    @POST
    @PermitAll
    public Response create(@Valid MessageDTORequest messageDTO) {
        createMessageUseCase.execute(messageDTO);
        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") UUID id) {
        MessageDTOResponse response = getMessageUseCase.execute(id);
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @GET
    @Path("/count")
    public Response count() {
        long count = getMessagesCountUseCase.execute();
        return Response.status(Response.Status.OK).entity(count).build();
    }

    @GET
    public Response getAll() {
        List<MessageDTOResponse> response = getAllMessageUseCase.execute();
        return Response.status(Response.Status.OK).entity(response).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") UUID id) {
        deleteMessageUseCase.execute(id);
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @POST
    @Path("/{id}")
    public Response sendMail(@Valid @PathParam("id") UUID id, RepliedMessageDTORequest request) {
        repliedMessageUseCase.execute(id, request);
        return Response.status(Response.Status.ACCEPTED).build();
    }

    @POST
    @Path("/read/{id}")
    public Response read(@PathParam("id") UUID id) {
        readMessageUseCase.execute(id);
        return Response.status(Response.Status.ACCEPTED).build();
    }
}
