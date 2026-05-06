package dev.flima.domain.users;

import java.util.Optional;

public interface UserRepository {
    long countUsers();
    void save(User user);
    Optional<User> getUsername(String username);
}
