package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;

public interface SneakerRepositoryCustom {
    Page<Sneaker> findAllListItems(SneakerFilter filter, Pageable pageable);
}
