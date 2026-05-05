package dev.flima.domain.exceptions;

public class BusinessRuleException extends DomainException {
    public BusinessRuleException(String message) {
        super(message);
    }
    @Override public int getStatusCode() {
        return 422;
    }
}
