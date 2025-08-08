package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.entity.*;
import ru.alex.reactsneakersapi.database.repository.CartItemRepository;
import ru.alex.reactsneakersapi.database.repository.OrderItemRepository;
import ru.alex.reactsneakersapi.database.repository.OrderRepository;
import ru.alex.reactsneakersapi.database.repository.SneakerItemRepository;
import ru.alex.reactsneakersapi.dto.order.OrderCreateDto;
import ru.alex.reactsneakersapi.dto.order.OrderListDto;
import ru.alex.reactsneakersapi.dto.orderItem.OrderItemCreateDto;
import ru.alex.reactsneakersapi.dto.user.UserDetailsDto;
import ru.alex.reactsneakersapi.exception.OrderNotFoundException;
import ru.alex.reactsneakersapi.exception.SneakerItemNotFoundException;
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
    @Value("${app.frontend-url}")
    private String frontendUrl;

    private final EmailService emailService;
    private final PaymentLinkService paymentLinkService;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final SneakerItemRepository sneakerItemRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderListMapper orderListMapper;

    public List<OrderListDto> findAll() {
        return orderRepository.findAllByUser(getAuthorizedUser().id())
                .stream()
                .map(orderListMapper::toDto)
                .toList();
    }

    @Transactional
    public Integer create(OrderCreateDto orderCreateDto) {
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
                throw new SneakerItemNotFoundException(orderItem.sneakerItem());
            }
        }

        Integer userId = getAuthorizedUser().id();
        Order order = Order.builder()
                .user(User.builder().id(userId).build())
                .status(OrderStatus.PENDING)
                .createdAt(Instant.now())
                .build();
        Order savedOrder = orderRepository.save(order);

        Integer orderId = savedOrder.getId();
        orderItemRepository.createOrderItemsBatch(orderId, orderCreateDto.items());
        cartItemRepository.clearUserCart(userId);
        sendOrderPaymentMail(orderId);
        return orderId;
    }

    @Transactional
    public void cancelOrder(Integer id) {
        Order order = orderRepository.findByIdAndUser(id, getAuthorizedUser().id())
                .orElseThrow(() -> new OrderNotFoundException(id));
        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);
    }

    public void resendOrderPaymentMail(Integer id) {
        Order order = orderRepository.findByIdAndUser(id, getAuthorizedUser().id())
                .orElseThrow(() -> new OrderNotFoundException(id));
        if(order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("the order has already been paid or cancelled");
        }
        sendOrderPaymentMail(id);
    }

    @Transactional
    public void payForOrder(String uuid) {
        Integer orderId = Integer.valueOf(paymentLinkService.validatePaymentLink(uuid));
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
        if(order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("the order has already been paid or cancelled");
        }
        order.setStatus(OrderStatus.COMPLETED);
    }

    private void sendOrderPaymentMail(Integer id) {
        UserDetailsDto authorizedUser = getAuthorizedUser();
        String paymentUuid = paymentLinkService.createPaymentLink(authorizedUser.id(), id);
        String paymentLink = String.format("%s/orders/pay-for-order/%s", frontendUrl, paymentUuid);
        emailService.sendPaymentEmail(id, authorizedUser.name(), authorizedUser.email(),  paymentLink);
    }

}
