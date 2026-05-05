package dev.flima.domain.exceptions;

public abstract class DomainException extends RuntimeException {
    public DomainException(String message) {
        super(message);
    }
    public abstract int getStatusCode();
}
