package ru.alex.reactsneakersapi.dto.sneaker;

import ru.alex.reactsneakersapi.dto.sneakerType.SneakerTypeReadDto;

import java.math.BigDecimal;

public record SneakerListDto(
        Integer id,
        String name,
        SneakerTypeReadDto type,
        String imageUrl,
        BigDecimal price,
        Integer firm,
        Boolean isFavorite
) {
}
