package dev.flima.application.stats.usecases;

import dev.flima.domain.exceptions.EntityNotFoundException;
import dev.flima.domain.stats.Stat;
import dev.flima.domain.stats.StatRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class DeleteStatUseCase {

    private final StatRepository statRepository;
    private final ResourceBundle messages =  ResourceBundle.getBundle("messages");

    public DeleteStatUseCase(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    @Transactional
    public void execute(UUID id) {
        Stat stat = statRepository.getById(id)
                        .orElseThrow(() -> new EntityNotFoundException(messages.getString("stat.not_found")));

        statRepository.remove(stat);
    }

}
