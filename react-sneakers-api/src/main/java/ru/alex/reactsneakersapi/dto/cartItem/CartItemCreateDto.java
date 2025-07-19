package ru.alex.reactsneakersapi.dto.cartItem;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemCreateDto(
        @NotNull
        Integer sneakerItem,
        @NotNull
        @Min(1)
        Integer quantity
) {
}
