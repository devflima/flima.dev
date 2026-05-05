package dev.flima.infrastructure.exceptions;

import dev.flima.presentation.rest.dto.ErrorResponse;
import jakarta.persistence.PersistenceException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.hibernate.exception.ConstraintViolationException;

@Provider
public class DatabaseExceptionHandler implements ExceptionMapper<PersistenceException> {

    @Override
    public Response toResponse(PersistenceException ex) {
        Throwable cause = ex;
        while (cause != null) {
            if (cause instanceof ConstraintViolationException) {
                return Response.status(409)
                        .entity(ErrorResponse.of("Record already exists with this unique identifier.", 409))
                        .build();
            }
            cause = cause.getCause();
        }

        return Response.status(500)
                .entity(ErrorResponse.of("Database error occurred.", 500))
                .build();
    }
}
