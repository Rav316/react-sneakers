package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.entity.CartItem;
import ru.alex.reactsneakersapi.database.repository.CartItemRepository;
import ru.alex.reactsneakersapi.dto.cart.CartResponse;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemCreateDto;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemEditDto;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemReadDto;
import ru.alex.reactsneakersapi.exception.CartItemNotFoundException;
import ru.alex.reactsneakersapi.mapper.cartItem.CartItemCreateMapper;
import ru.alex.reactsneakersapi.mapper.cartItem.CartItemReadMapper;

import java.math.BigDecimal;
import java.util.List;

import static ru.alex.reactsneakersapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final CartItemCreateMapper cartItemCreateMapper;
    private final CartItemReadMapper cartItemReadMapper;

    public CartResponse getCartByUser() {
        List<CartItemReadDto> items = cartItemRepository.findAllByUser(getAuthorizedUser().id())
                .stream()
                .map(cartItemReadMapper::toDto)
                .toList();
        BigDecimal sum = items.stream()
                .map(item -> item.price().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal::add)
                .orElse(BigDecimal.ZERO);
        return new CartResponse(items, sum);
    }

    @Transactional
    public CartItemReadDto increaseCartItem(CartItemCreateDto cartItemCreateDto) {
        CartItem cartItem = cartItemCreateMapper.toEntity(cartItemCreateDto);
        return cartItemReadMapper.toDto(cartItemRepository.save(cartItem));
    }

    @Transactional
    public CartItemReadDto updateCartItemQuantity(Integer id, CartItemEditDto cartItemEditDto) {
        CartItem cartItem = cartItemRepository.findByIdAndUserWithLoadedEntities(id, getAuthorizedUser().id())
                .orElseThrow(() -> new CartItemNotFoundException(id));
        cartItem.setQuantity(cartItem.getQuantity() + cartItemEditDto.quantity());
        return cartItemReadMapper.toDto(cartItemRepository.save(cartItem));
    }

    @Transactional
    public void decrementCartItem(Integer id) {
        CartItem cartItem = cartItemRepository.findByIdAndUser(id, getAuthorizedUser().id())
                .orElseThrow(() -> new CartItemNotFoundException(id));
        if(cartItem.getQuantity() > 1) {
            cartItem.setQuantity(cartItem.getQuantity() - 1);
            cartItemRepository.save(cartItem);
        }
    }

    public void removeCartItem(Integer id) {
        cartItemRepository.removeByIdAndUser(id, getAuthorizedUser().id());
    }
}
