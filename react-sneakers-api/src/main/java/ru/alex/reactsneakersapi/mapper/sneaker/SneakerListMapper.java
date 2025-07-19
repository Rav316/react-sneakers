package ru.alex.reactsneakersapi.mapper.sneaker;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.mapper.Mapper;

@Component
public class SneakerListMapper implements Mapper {
    public SneakerListDto toDto(Sneaker entity, boolean isFavorite) {
        return new SneakerListDto(
                entity.getId(),
                entity.getName(),
                entity.getImageUrl(),
                entity.getPrice(),
                entity.getFirm().getId(),
                isFavorite
        );
    }
}
