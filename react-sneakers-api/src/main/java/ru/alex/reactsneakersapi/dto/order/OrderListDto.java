package ru.alex.reactsneakersapi.dto.order;

import ru.alex.reactsneakersapi.database.entity.OrderStatus;

import java.time.Instant;

public record OrderListDto (
        Integer id,
        OrderStatus status,
        Instant createdAt
) {
}
