package ru.alex.reactsneakersapi.dto.orderItem;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemCreateDto (
        @NotNull
        Integer sneakerItem,
        @NotNull
        @Min(1)
        Integer quantity
) {
}
