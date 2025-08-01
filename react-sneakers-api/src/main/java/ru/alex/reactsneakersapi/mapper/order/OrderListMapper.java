package ru.alex.reactsneakersapi.mapper.order;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.Order;
import ru.alex.reactsneakersapi.dto.order.OrderListDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class OrderListMapper extends ReadMapper<Order, OrderListDto> {

    @Override
    public OrderListDto toDto(Order entity) {
        return new OrderListDto(
                entity.getId(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
