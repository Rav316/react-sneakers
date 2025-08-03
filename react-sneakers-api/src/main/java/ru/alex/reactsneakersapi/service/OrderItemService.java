package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.repository.OrderItemRepository;
import ru.alex.reactsneakersapi.dto.order.OrderItemResponse;
import ru.alex.reactsneakersapi.dto.orderItem.OrderItemReadDto;
import ru.alex.reactsneakersapi.mapper.orderItem.OrderItemReadMapper;

import java.math.BigDecimal;
import java.util.List;

import static ru.alex.reactsneakersapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;
    private final OrderItemReadMapper orderItemReadMapper;

    public OrderItemResponse findAllByOrder(Integer orderId) {
        List<OrderItemReadDto> items = orderItemRepository.findAllByUserOrder(orderId, getAuthorizedUser().id())
                .stream()
                .map(orderItemReadMapper::toDto)
                .toList();
        BigDecimal sum = items.stream()
                .map(item -> item.price().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal::add)
                .orElse(BigDecimal.ZERO);
        return new OrderItemResponse(orderId, items, sum);
    }
}
