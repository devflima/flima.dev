package dev.flima.domain.users;

public enum Role {
    OWNER(Labels.OWNER);

    private final String label;

    Role(String label) {
        this.label = label;
    }

    public static class Labels {
        public static final String OWNER = "OWNER";
    }
}
