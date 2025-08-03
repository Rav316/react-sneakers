package ru.alex.reactsneakersapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alex.reactsneakersapi.dto.order.OrderCreateDto;
import ru.alex.reactsneakersapi.dto.order.OrderItemResponse;
import ru.alex.reactsneakersapi.dto.order.OrderListDto;
import ru.alex.reactsneakersapi.service.OrderItemService;
import ru.alex.reactsneakersapi.service.OrderService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

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
    public ResponseEntity<Integer> create(@Validated @RequestBody OrderCreateDto orderCreateDto) {
        return new ResponseEntity<>(orderService.create(orderCreateDto), CREATED);
    }
}
