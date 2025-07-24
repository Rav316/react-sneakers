package ru.alex.reactsneakersapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alex.reactsneakersapi.dto.cart.CartResponse;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemCreateDto;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemEditDto;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemReadDto;
import ru.alex.reactsneakersapi.service.CartService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

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
    public ResponseEntity<CartItemReadDto> addSneakerToCart(
            @Validated @RequestBody CartItemCreateDto cartItemCreateDto
    ) {
        return new ResponseEntity<>(cartService.increaseCartItem(cartItemCreateDto), CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItemReadDto> updateCartItemQuantity(@PathVariable("id") Integer id,
                                                                  @Validated @RequestBody CartItemEditDto cartItemEditDto) {
        return new ResponseEntity<>(cartService.updateCartItemQuantity(id, cartItemEditDto), OK);
    }

    @PutMapping("/sync")
    public ResponseEntity<HttpStatus> syncGuestCart(@RequestBody List<CartItemCreateDto> cartItems) {
        cartService.syncGuestCart(cartItems);
        return new ResponseEntity<>(OK);
    }


    @PutMapping("/{id}/decrement")
    public ResponseEntity<HttpStatus> decrementCartItemQuantity(@PathVariable("id") Integer id) {
        cartService.decrementCartItem(id);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> removeSneakerFromCart(@PathVariable("id") Integer id) {
        cartService.removeCartItem(id);
        return new ResponseEntity<>(NO_CONTENT);
    }
}
