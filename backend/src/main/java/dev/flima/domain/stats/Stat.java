package dev.flima.domain.stats;

import java.util.UUID;

public class Stat {

    private UUID id;
    private String yearsExperience;
    private String systemDeployed;
    private String uptimeSLA;
    private String commitsLogged;
    private String status;
    private String objective;

    public Stat(String yearsExperience, String systemDeployed, String uptimeSLA, String commitsLogged, String status, String objective) {
        this.id = UUID.randomUUID();
        this.yearsExperience = yearsExperience;
        this.systemDeployed = systemDeployed;
        this.uptimeSLA = uptimeSLA;
        this.commitsLogged = commitsLogged;
        this.status = status;
        this.objective = objective;
    }

    public Stat(UUID id, String yearsExperience, String systemDeployed, String uptimeSLA, String commitsLogged, String status, String objective) {
        this.id = id;
        this.yearsExperience = yearsExperience;
        this.systemDeployed = systemDeployed;
        this.uptimeSLA = uptimeSLA;
        this.commitsLogged = commitsLogged;
        this.status = status;
        this.objective = objective;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getYearsExperience() {
        return yearsExperience;
    }

    public void setYearsExperience(String yearsExperience) {
        this.yearsExperience = yearsExperience;
    }

    public String getSystemDeployed() {
        return systemDeployed;
    }

    public void setSystemDeployed(String systemDeployed) {
        this.systemDeployed = systemDeployed;
    }

    public String getUptimeSLA() {
        return uptimeSLA;
    }

    public void setUptimeSLA(String uptimeSLA) {
        this.uptimeSLA = uptimeSLA;
    }

    public String getCommitsLogged() {
        return commitsLogged;
    }

    public void setCommitsLogged(String commitsLogged) {
        this.commitsLogged = commitsLogged;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }
}
