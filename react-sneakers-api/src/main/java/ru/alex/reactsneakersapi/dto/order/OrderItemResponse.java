package ru.alex.reactsneakersapi.dto.order;

import ru.alex.reactsneakersapi.dto.orderItem.OrderItemReadDto;

import java.math.BigDecimal;
import java.util.List;

public record OrderItemResponse (
        Integer orderId,
        List<OrderItemReadDto> items,
        BigDecimal sum
) {
}
