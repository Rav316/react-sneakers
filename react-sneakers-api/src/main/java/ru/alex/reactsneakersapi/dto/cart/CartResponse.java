package ru.alex.reactsneakersapi.dto.cart;

import ru.alex.reactsneakersapi.dto.cartItem.CartItemReadDto;

import java.math.BigDecimal;
import java.util.List;

public record CartResponse (
        List<CartItemReadDto> items,
        BigDecimal sum
) {
}
