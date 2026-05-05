package dev.flima.infrastructure.educations;

import dev.flima.domain.educations.Education;
import dev.flima.domain.educations.EducationRepository;
import dev.flima.domain.exceptions.EntityNotFoundException;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class EducationRepositoryImpl implements EducationRepository, PanacheRepositoryBase<EducationPanacheEntity, UUID> {

    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public void save(Education education) {
        EducationPanacheEntity entity = new EducationPanacheEntity();

        entity.id = education.getId();
        entity.typeEducation = education.getTypeEducation();
        entity.degree = education.getDegree();
        entity.title = education.getTitle();
        entity.institution = education.getInstitution();
        entity.period = education.getPeriod();
        entity.specialization = education.getSpecialization();
        entity.skills = education.getSkills();
        entity.architectures = education.getArchitectures();

        persist(entity);
    }

    @Override
    public void modify(Education education) {
        EducationPanacheEntity entity = findById(education.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("education.not_found"));
        }

        entity.typeEducation = education.getTypeEducation();
        entity.degree = education.getDegree();
        entity.title = education.getTitle();
        entity.institution = education.getInstitution();
        entity.period = education.getPeriod();
        entity.specialization = education.getSpecialization();
        entity.skills = education.getSkills();
        entity.architectures = education.getArchitectures();
    }

    @Override
    public Optional<Education> getById(UUID id) {
        EducationPanacheEntity entity = findById(id);

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("education.not_found"));
        }

        return Optional.of(new Education(
                entity.id,
                entity.typeEducation,
                entity.degree,
                entity.title,
                entity.institution,
                entity.period,
                entity.specialization,
                entity.skills,
                entity.architectures
        ));
    }

    @Override
    public List<Education> getAll() {
        return findAll().list().stream()
                .map(entity -> new Education(
                    entity.id,
                    entity.typeEducation,
                    entity.degree,
                    entity.title,
                    entity.institution,
                    entity.period,
                    entity.specialization,
                    entity.skills,
                    entity.architectures
                ))
                .toList();
    }

    @Override
    public void remove(Education education) {
        EducationPanacheEntity entity = findById(education.getId());

        if (entity == null) {
            throw new EntityNotFoundException(messages.getString("education.not_found"));
        }

        delete(entity);
    }
}
