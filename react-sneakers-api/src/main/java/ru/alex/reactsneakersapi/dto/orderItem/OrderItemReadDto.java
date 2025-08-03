package ru.alex.reactsneakersapi.dto.orderItem;

import java.math.BigDecimal;

public record OrderItemReadDto(
        Integer id,
        String name,
        String description,
        String imageUrl,
        BigDecimal price,
        Integer size,
        Integer quantity
) {
}
