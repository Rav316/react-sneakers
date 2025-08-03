package ru.alex.reactsneakersapi.mapper.orderItem;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.OrderItem;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.database.entity.SneakerItem;
import ru.alex.reactsneakersapi.dto.orderItem.OrderItemReadDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class OrderItemReadMapper extends ReadMapper<OrderItem, OrderItemReadDto> {
    @Override
    public OrderItemReadDto toDto(OrderItem entity) {
        SneakerItem sneakerItem = entity.getSneakerItem();
        Sneaker sneaker = sneakerItem.getSneaker();
        return new OrderItemReadDto(
                entity.getId(),
                sneaker.getName(),
                sneaker.getDescription(),
                sneaker.getImageUrl(),
                sneaker.getPrice(),
                sneakerItem.getSize(),
                entity.getQuantity()
        );
    }
}
