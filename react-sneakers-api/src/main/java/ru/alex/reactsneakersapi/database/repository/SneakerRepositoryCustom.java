package ru.alex.reactsneakersapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;

import java.util.List;

public interface SneakerRepositoryCustom {
    Page<SneakerListDto> findAllListItems(Integer userId, SneakerFilter filter, Pageable pageable);
    void addFavoritesBatch(List<Integer> sneakerIds, Integer userId);
    void addToFavorite(Integer sneakerId, Integer userId);
    void removeFromFavorites(Integer sneakerId, Integer userId);
    void removeAllFavorites(Integer userId);
}
