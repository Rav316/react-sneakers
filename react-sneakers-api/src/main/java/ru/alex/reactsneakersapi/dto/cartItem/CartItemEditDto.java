package ru.alex.reactsneakersapi.dto.cartItem;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemEditDto(
        @NotNull
        @Min(1)
        Integer quantity
) {
}
