package dev.flima.infrastructure.exceptions;

import dev.flima.domain.exceptions.DomainException;
import dev.flima.presentation.rest.dto.ErrorResponse;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class DomainExceptionHandler implements ExceptionMapper<DomainException> {

    @Override
    public Response toResponse(DomainException ex) {
        return Response.status(ex.getStatusCode())
                .entity(ErrorResponse.of(ex.getMessage(), ex.getStatusCode()))
                .build();
    }
}
