package ru.alex.reactsneakersapi.dto.sneaker;

import ru.alex.reactsneakersapi.dto.sneakerItem.SneakerItemReadDto;

import java.math.BigDecimal;
import java.util.List;

public record SneakerReadDto(
        Integer id,
        String name,
        String imageUrl,
        BigDecimal price,
        String description,
        String firm,
        List<SneakerItemReadDto> items
) {
}
