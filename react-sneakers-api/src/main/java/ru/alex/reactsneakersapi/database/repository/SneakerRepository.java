package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.reactsneakersapi.database.entity.Sneaker;

import java.util.List;
import java.util.Optional;

@Repository
public interface SneakerRepository extends JpaRepository<Sneaker, Integer>, SneakerRepositoryCustom {
    @Query("SELECT s FROM Sneaker s JOIN s.favoriteUsers u WHERE u.id = :userId")
    List<Sneaker> findAllFavorites(Integer userId);

    @Query("SELECT s FROM Sneaker s LEFT JOIN FETCH s.items i LEFT JOIN s.firm f WHERE s.id = :id")
    Optional<Sneaker> findByIdWithItems(Integer id);
}
