package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.entity.CartItem;
import ru.alex.reactsneakersapi.database.repository.CartItemRepository;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemCreateDto;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemReadDto;
import ru.alex.reactsneakersapi.exception.CartItemNotFoundException;
import ru.alex.reactsneakersapi.mapper.cartItem.CartItemCreateMapper;
import ru.alex.reactsneakersapi.mapper.cartItem.CartItemReadMapper;

import java.util.List;

import static ru.alex.reactsneakersapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartItemCreateMapper cartItemCreateMapper;
    private final CartItemReadMapper cartItemReadMapper;

    public List<CartItemReadDto> findAll() {
        return cartItemRepository.findAllByUser(getAuthorizedUser().id())
                .stream()
                .map(cartItemReadMapper::toDto)
                .toList();
    }

    @Transactional
    public void increaseCartItem(CartItemCreateDto cartItemCreateDto) {
        cartItemRepository.findBySneakerItemAndUser(cartItemCreateDto.sneakerItem(), getAuthorizedUser().id())
                .ifPresentOrElse(item -> {
                    item.setQuantity(item.getQuantity() + cartItemCreateDto.quantity());
                    cartItemRepository.save(item);
                }, () -> {
                    CartItem cartItem = cartItemCreateMapper.toEntity(cartItemCreateDto);
                    cartItemRepository.save(cartItem);
                });
    }

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
