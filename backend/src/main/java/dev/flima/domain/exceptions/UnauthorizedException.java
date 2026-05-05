package dev.flima.domain.exceptions;

public class UnauthorizedException extends DomainException {
    public UnauthorizedException(String message) {
        super(message);
    }
    @Override public int getStatusCode() {
        return 401;
    }
}
