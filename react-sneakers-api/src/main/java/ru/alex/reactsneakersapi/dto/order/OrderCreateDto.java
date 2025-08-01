package ru.alex.reactsneakersapi.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import ru.alex.reactsneakersapi.dto.orderItem.OrderItemCreateDto;

import java.util.List;

public record OrderCreateDto (
        @NotNull
        @NotEmpty
        @Valid
        List<OrderItemCreateDto> items
) {
}
