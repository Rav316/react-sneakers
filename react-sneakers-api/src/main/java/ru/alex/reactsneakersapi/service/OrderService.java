package ru.alex.reactsneakersapi.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.entity.*;
import ru.alex.reactsneakersapi.database.repository.OrderItemRepository;
import ru.alex.reactsneakersapi.database.repository.OrderRepository;
import ru.alex.reactsneakersapi.database.repository.SneakerItemRepository;
import ru.alex.reactsneakersapi.dto.order.OrderCreateDto;
import ru.alex.reactsneakersapi.dto.order.OrderListDto;
import ru.alex.reactsneakersapi.dto.orderItem.OrderItemCreateDto;
import ru.alex.reactsneakersapi.mapper.order.OrderListMapper;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static ru.alex.reactsneakersapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final SneakerItemRepository sneakerItemRepository;
    private final OrderListMapper orderListMapper;

    public List<OrderListDto> findAll() {
        return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(orderListMapper::toDto)
                .toList();
    }

    @Transactional
    public void create(OrderCreateDto orderCreateDto) {
        List<OrderItemCreateDto> orderItemCreateList = orderCreateDto.items();
        Set<Integer> sneakerItemIds = orderItemCreateList
                .stream()
                .map(OrderItemCreateDto::sneakerItem)
                .collect(Collectors.toSet());
        if(sneakerItemIds.size() != (orderItemCreateList.size())) {
            throw new IllegalStateException("sneaker items in order must be unique");
        }
        List<SneakerItem> sneakerItems = sneakerItemRepository.findAllById(sneakerItemIds);

        Set<Integer> sneakerItemIdsFromDb = sneakerItems.stream()
                .map(SneakerItem::getId)
                .collect(Collectors.toSet());

        for (OrderItemCreateDto orderItem : orderItemCreateList) {
            if (!sneakerItemIdsFromDb.contains(orderItem.sneakerItem())) {
                throw new EntityNotFoundException("sneakerItem with id " + orderItem.sneakerItem() + " not found");
            }
        }

        Order order = Order.builder()
                .user(User.builder().id(getAuthorizedUser().id()).build())
                .status(OrderStatus.PENDING)
                .createdAt(Instant.now())
                .build();
        Order savedOrder = orderRepository.save(order);

        orderItemRepository.createOrderItemsBatch(savedOrder.getId(), orderCreateDto.items());
    }
}
