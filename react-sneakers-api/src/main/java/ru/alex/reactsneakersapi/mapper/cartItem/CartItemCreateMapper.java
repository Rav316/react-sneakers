package ru.alex.reactsneakersapi.mapper.cartItem;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.CartItem;
import ru.alex.reactsneakersapi.database.entity.SneakerItem;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.database.repository.SneakerItemRepository;
import ru.alex.reactsneakersapi.database.repository.UserRepository;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemCreateDto;
import ru.alex.reactsneakersapi.exception.SneakerItemNotFoundException;
import ru.alex.reactsneakersapi.exception.UserNotFoundException;
import ru.alex.reactsneakersapi.mapper.CreateMapper;

import static ru.alex.reactsneakersapi.util.AuthUtils.getAuthorizedUser;

@Component
@RequiredArgsConstructor
public class CartItemCreateMapper extends CreateMapper<CartItem, CartItemCreateDto> {
    private final SneakerItemRepository sneakerItemRepository;
    private final UserRepository userRepository;

    @Override
    public CartItem toEntity(CartItemCreateDto dto) {
        SneakerItem sneakerItem = sneakerItemRepository.findByIdWithLoadedEntities(dto.sneakerItem())
                .orElseThrow(() -> new SneakerItemNotFoundException(dto.sneakerItem()));
        String authorizedUserEmail = getAuthorizedUser().email();
        User user = userRepository.findByEmail(authorizedUserEmail)
                .orElseThrow(() -> new UserNotFoundException(authorizedUserEmail));
        return CartItem.builder()
                .sneakerItem(sneakerItem)
                .quantity(dto.quantity())
                .user(user)
                .build();
    }
}
