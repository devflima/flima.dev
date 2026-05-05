package dev.flima.domain.users;

import java.util.Optional;

public interface UserRepository {
    long count();
    void save(User user);
    Optional<User> getUsername(String username);
}
