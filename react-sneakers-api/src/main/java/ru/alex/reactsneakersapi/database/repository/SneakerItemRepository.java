package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.alex.reactsneakersapi.database.entity.SneakerItem;

import java.util.Optional;

@Repository
public interface SneakerItemRepository extends JpaRepository<SneakerItem, Integer> {
    @Query("SELECT si FROM SneakerItem si LEFT JOIN FETCH si.sneaker s LEFT JOIN FETCH s.type t WHERE si.id = :id")
    Optional<SneakerItem> findByIdWithLoadedEntities(Integer id);
}
