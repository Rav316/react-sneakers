package ru.alex.reactsneakersapi.database.repository;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.reactsneakersapi.database.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Cacheable(value = "users", key = "#email")
    Optional<User> findByEmail(String email);

    Optional<User> findByUuid(String uuid);
}
