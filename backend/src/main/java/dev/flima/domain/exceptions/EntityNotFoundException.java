package dev.flima.domain.exceptions;

public class EntityNotFoundException extends DomainException {
    public EntityNotFoundException(String message) {
        super(message);
    }
    @Override public int getStatusCode() {
        return 404;
    }
}
