package ru.alex.reactsneakersapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class CartItemNotFoundException extends EntityNotFoundException {
    public CartItemNotFoundException(Integer id) {
        super("cart item with id " + id + " not found");
    }
}
