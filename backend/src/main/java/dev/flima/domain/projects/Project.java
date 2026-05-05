package dev.flima.domain.projects;

import java.util.List;
import java.util.UUID;

public class Project {

    private UUID id;
    private String title;
    private String subtitle;
    private String description;
    private List<String> technologies;
    private String codeSnippet;
    private String icon;

    public Project(String title, String subtitle, String description, List<String> technologies, String codeSnippet, String icon) {
        this.id = UUID.randomUUID();
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.technologies = technologies;
        this.codeSnippet = codeSnippet;
        this.icon = icon;
    }

    public Project(UUID id, String title, String subtitle, String description, List<String> technologies, String codeSnippet, String icon) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.technologies = technologies;
        this.codeSnippet = codeSnippet;
        this.icon = icon;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }

    public String getCodeSnippet() {
        return codeSnippet;
    }

    public void setCodeSnippet(String codeSnippet) {
        this.codeSnippet = codeSnippet;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
