package dev.flima.infrastructure.users;

import dev.flima.domain.users.Password;
import dev.flima.domain.users.User;
import dev.flima.domain.users.UserRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Optional;
import java.util.ResourceBundle;
import java.util.UUID;

@ApplicationScoped
public class UserRepositoryImpl implements UserRepository, PanacheRepositoryBase<UserPanacheEntity, UUID> {

    private final ResourceBundle messages = ResourceBundle.getBundle("messages");

    @Override
    public long countUsers() {
        return count();
    }

    @Override
    public void save(User user) {
        UserPanacheEntity entity = new UserPanacheEntity();

        entity.id = user.getId();
        entity.username = user.getUsername();
        entity.name = user.getName();
        entity.lastName = user.getLastName();
        entity.email = user.getEmail();
        entity.role = user.getRole();
        entity.password = user.getPassword().password();

        persist(entity);
    }

    @Override
    public Optional<User> getUsername(String username) {
        UserPanacheEntity entity = find("username", username).firstResult();

        if(entity == null) {
            return Optional.empty();
        }

        return Optional.of(new User(
                entity.id,
                entity.username,
                entity.name,
                entity.lastName,
                entity.email,
                entity.role,
                new Password(entity.password)
        ));
    }
}
