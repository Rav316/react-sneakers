package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.reactsneakersapi.database.entity.Sneaker;

import java.util.List;

@Repository
public interface SneakerRepository extends JpaRepository<Sneaker, Integer>, SneakerRepositoryCustom {
    @Query("SELECT s FROM Sneaker s JOIN s.favoriteUsers u WHERE u.id = :userId")
    List<Sneaker> findAllFavorites(Integer userId);
}
