package dev.flima.domain.educations;

import java.util.List;
import java.util.UUID;

public class Education {

    private UUID id;
    private TypeEducation typeEducation;
    private String degree;
    private String title;
    private String institution;
    private String period;
    private String specialization;
    private List<String> skills;
    private List<String> architectures;

    public Education(TypeEducation typeEducation, String degree, String title, String institution,
                     String period, String specialization, List<String> skills, List<String> architectures
    ) {
        this.id = UUID.randomUUID();
        this.typeEducation = typeEducation;
        this.degree = degree;
        this.title = title;
        this.institution = institution;
        this.period = period;
        this.specialization = specialization;
        this.skills = skills;
        this.architectures = architectures;
    }

    public Education(UUID id, TypeEducation typeEducation, String degree, String title, String institution,
                     String period, String specialization, List<String> skills, List<String> architectures
    ) {
        this.id = id;
        this.typeEducation = typeEducation;
        this.degree = degree;
        this.title = title;
        this.institution = institution;
        this.period = period;
        this.specialization = specialization;
        this.skills = skills;
        this.architectures = architectures;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public TypeEducation getTypeEducation() {
        return typeEducation;
    }

    public void setTypeEducation(TypeEducation typeEducation) {
        this.typeEducation = typeEducation;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getArchitectures() {
        return architectures;
    }

    public void setArchitectures(List<String> architectures) {
        this.architectures = architectures;
    }
}
