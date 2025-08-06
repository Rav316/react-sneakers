package ru.alex.reactsneakersapi.http.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alex.reactsneakersapi.dto.order.OrderCreateDto;
import ru.alex.reactsneakersapi.dto.order.OrderItemResponse;
import ru.alex.reactsneakersapi.dto.order.OrderListDto;
import ru.alex.reactsneakersapi.service.OrderItemService;
import ru.alex.reactsneakersapi.service.OrderService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final OrderItemService orderItemService;

    @GetMapping
    public List<OrderListDto> findAll() {
        return orderService.findAll();
    }

    @GetMapping("/{id}/items")
    public ResponseEntity<OrderItemResponse> findAllOrderItems(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(orderItemService.findAllByOrder(id), OK);
    }

    @PostMapping
    public ResponseEntity<Integer> create(
            @Validated @RequestBody OrderCreateDto orderCreateDto,
            HttpServletRequest request
    ) {
        Integer orderId = orderService.create(orderCreateDto, request);
        return new ResponseEntity<>(orderId, CREATED);
    }

    @PostMapping("/{id}/resend-payment-mail")
    public ResponseEntity<HttpStatus> resendPaymentMail(@PathVariable("id") Integer id, HttpServletRequest request) {
        orderService.resendOrderPaymentMail(id ,request);
        return new ResponseEntity<>(OK);
    }

    @GetMapping("/pay-for-order/{uuid}")
    public ResponseEntity<HttpStatus> payForOrder(@PathVariable("uuid") String uuid) {
        orderService.payForOrder(uuid);
        return new ResponseEntity<>(OK);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<HttpStatus> cancelOrder(@PathVariable("id") Integer id) {
        orderService.cancelOrder(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
