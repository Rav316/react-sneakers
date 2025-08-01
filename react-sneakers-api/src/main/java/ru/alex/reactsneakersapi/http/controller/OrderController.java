package ru.alex.reactsneakersapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alex.reactsneakersapi.dto.order.OrderCreateDto;
import ru.alex.reactsneakersapi.dto.order.OrderListDto;
import ru.alex.reactsneakersapi.service.OrderService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public List<OrderListDto> findAll() {
        return orderService.findAll();
    }

    @PostMapping
    public ResponseEntity<HttpStatus> create(@Validated @RequestBody OrderCreateDto orderCreateDto) {
        orderService.create(orderCreateDto);
        return new ResponseEntity<>(CREATED);
    }
}
