package ru.alex.reactsneakersapi.database.repository;


import ru.alex.reactsneakersapi.dto.cartItem.CartItemCreateDto;

import java.util.List;

public interface CartItemRepositoryCustom {
    void addToCartBatch(List<CartItemCreateDto> cartItems, Integer userId);
}
