package ru.alex.reactsneakersapi.mapper.cartItem;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.CartItem;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.database.entity.SneakerItem;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemReadDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class CartItemReadMapper extends ReadMapper<CartItem, CartItemReadDto> {
    @Override
    public CartItemReadDto toDto(CartItem entity) {
        SneakerItem sneakerItem = entity.getSneakerItem();
        Sneaker sneaker = sneakerItem.getSneaker();
        return new CartItemReadDto(
                entity.getId(),
                sneaker.getName(),
                sneaker.getImageUrl(),
                sneaker.getPrice(),
                sneakerItem.getSize(),
                entity.getQuantity()
        );
    }
}
