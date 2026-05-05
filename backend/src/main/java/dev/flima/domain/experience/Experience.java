package dev.flima.domain.experience;

import java.util.List;
import java.util.UUID;

public class Experience {

    private UUID id;
    private String title;
    private String company;
    private String period;
    private List<String> bullets;
    private List<String> technologies;
    private String icon;

    public Experience(String title, String company, String period, List<String> bullets, List<String> technologies, String icon) {
        this.id = UUID.randomUUID();
        this.title = title;
        this.company = company;
        this.period = period;
        this.bullets = bullets;
        this.technologies = technologies;
        this.icon = icon;
    }

    public Experience(UUID id, String title, String company, String period, List<String> bullets, List<String> technologies, String icon) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.period = period;
        this.bullets = bullets;
        this.technologies = technologies;
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public List<String> getBullets() {
        return bullets;
    }

    public void setBullets(List<String> bullets) {
        this.bullets = bullets;
    }

    public List<String> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
