package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.alex.reactsneakersapi.database.entity.SneakerItem;

@Repository
public interface SneakerItemRepository extends JpaRepository<SneakerItem, Integer> {
}
