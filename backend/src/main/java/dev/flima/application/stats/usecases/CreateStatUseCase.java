package dev.flima.application.stats.usecases;

import dev.flima.application.stats.dtos.request.StatDTORequest;
import dev.flima.application.stats.dtos.response.CreateStatDTOResponse;
import dev.flima.domain.stats.Stat;
import dev.flima.domain.stats.StatRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class CreateStatUseCase {

    private final StatRepository statRepository;

    public CreateStatUseCase(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    @Transactional
    public CreateStatDTOResponse execute(StatDTORequest statsDTO) {
        Stat stat = new Stat(
                statsDTO.yearsExperience(),
                statsDTO.systemDeployed(),
                statsDTO.uptimeSLA(),
                statsDTO.commitsLogged(),
                statsDTO.status(),
                statsDTO.objective()
        );

        statRepository.save(stat);

        return new CreateStatDTOResponse(
                stat.getId()
        );
    }

}
