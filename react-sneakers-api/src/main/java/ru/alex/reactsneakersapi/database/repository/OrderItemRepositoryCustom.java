package ru.alex.reactsneakersapi.database.repository;

import ru.alex.reactsneakersapi.dto.orderItem.OrderItemCreateDto;

import java.util.List;

public interface OrderItemRepositoryCustom {
    void createOrderItemsBatch(Integer orderId, List<OrderItemCreateDto> orderItems);
}
