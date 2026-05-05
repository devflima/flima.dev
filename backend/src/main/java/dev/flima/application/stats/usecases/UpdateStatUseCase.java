package dev.flima.application.stats.usecases;

import dev.flima.application.stats.dtos.request.StatDTORequest;
import dev.flima.application.stats.dtos.response.StatDTOResponse;
import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stats.Stat;
import dev.flima.domain.stats.StatRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class UpdateStatUseCase {

    private final StatRepository statRepository;
    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    public UpdateStatUseCase(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    @Transactional
    public StatDTOResponse execute(UUID id, StatDTORequest statsDTO) {
        Stat stat = statRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("stat.not_found")));

        stat.setYearsExperience(statsDTO.yearsExperience());
        stat.setSystemDeployed(statsDTO.systemDeployed());
        stat.setUptimeSLA(statsDTO.uptimeSLA());
        stat.setCommitsLogged(statsDTO.commitsLogged());
        stat.setStatus(statsDTO.status());
        stat.setObjective(statsDTO.objective());

        statRepository.modify(stat);

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
