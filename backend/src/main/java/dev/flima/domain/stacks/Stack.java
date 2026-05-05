package dev.flima.domain.stacks;

import java.util.List;
import java.util.UUID;

public class Stack {

    private UUID id;
    private StackType stackType;
    private List<String> technologies;

    public Stack(StackType stackType, List<String> technologies) {
        this.id = UUID.randomUUID();
        this.stackType = stackType;
        this.technologies = technologies;
    }

    public Stack(UUID id, StackType stackType, List<String> technologies) {
        this.id = id;
        this.stackType = stackType;
        this.technologies = technologies;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public StackType getStackType() {
        return stackType;
    }

    public void setStackType(StackType stackType) {
        this.stackType = stackType;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }
}
