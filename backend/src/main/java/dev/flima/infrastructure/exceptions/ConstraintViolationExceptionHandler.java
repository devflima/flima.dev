package dev.flima.infrastructure.exceptions;

import dev.flima.presentation.rest.dto.ErrorResponse;
import io.quarkus.logging.Log;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import java.util.List;

@Provider
public class ConstraintViolationExceptionHandler implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException ex) {
        List<String> details = ex.getConstraintViolations().stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .toList();

        Log.warnf("Validation failed: %s", details);
        return Response.status(400)
                .entity(ErrorResponse.of("Validation failed", 400, details))
                .build();
    }
}
