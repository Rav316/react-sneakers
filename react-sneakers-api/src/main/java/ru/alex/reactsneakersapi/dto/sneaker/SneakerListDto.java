package ru.alex.reactsneakersapi.dto.sneaker;

import java.math.BigDecimal;

public record SneakerListDto(
        Integer id,
        String name,
        String imageUrl,
        BigDecimal price,
        String description,
        Integer firm
) {
}
