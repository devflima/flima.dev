package dev.flima.application.stats.usecases;

import dev.flima.application.stats.dtos.response.StatDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stats.Stat;
import dev.flima.domain.stats.StatRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class GetStatUseCase {

    private final StatRepository statRepository;
    private final ResourceBundle messages =  ResourceBundle.getBundle("messages");

    public GetStatUseCase(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    public StatDTOResponse execute(UUID id) {
        Stat stat = statRepository.getById(id)
                .orElseThrow(() -> new EntityNotFoundException(messages.getString("stat.not_found")));

        return new StatDTOResponse(
                stat.getId(),
                stat.getYearsExperience(),
                stat.getSystemDeployed(),
                stat.getUptimeSLA(),
                stat.getCommitsLogged(),
                stat.getStatus(),
                stat.getObjective()
        );
    }

}
