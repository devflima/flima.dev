package dev.flima.application.stats.usecases;

import dev.flima.application.stats.dtos.response.StatDTOResponse;
import dev.flima.domain.stats.Stat;
import dev.flima.domain.stats.StatRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class GetAllStatUseCase {

    private final StatRepository statRepository;

    public GetAllStatUseCase(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    public List<StatDTOResponse> execute() {
        List<Stat> entities = statRepository.getAll();
        return entities.stream()
                .map(entity -> new StatDTOResponse(
                        entity.getId(),
                        entity.getYearsExperience(),
                        entity.getSystemDeployed(),
                        entity.getUptimeSLA(),
                        entity.getCommitsLogged(),
                        entity.getStatus(),
                        entity.getObjective()
                )).toList();
    }

}
