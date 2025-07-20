package ru.alex.reactsneakersapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alex.reactsneakersapi.dto.cart.CartResponse;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemCreateDto;
import ru.alex.reactsneakersapi.service.CartService;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartResponse> getUserCart() {
        return new ResponseEntity<>(cartService.getCartByUser(), OK);
    }

    @PostMapping
    public ResponseEntity<HttpStatus> addSneakerToCart(
            @Validated @RequestBody CartItemCreateDto cartItemCreateDto
    ) {
        cartService.increaseCartItem(cartItemCreateDto);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> removeSneakerFromCart(@PathVariable("id") Integer id) {
        cartService.removeCartItem(id);
        return new ResponseEntity<>(NO_CONTENT);
    }

    @PutMapping("/{id}/decrement")
    public ResponseEntity<HttpStatus> decrementCartItemQuantity(@PathVariable("id") Integer id) {
        cartService.decrementCartItem(id);
        return new ResponseEntity<>(OK);
    }
}
