package ru.alex.reactsneakersapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class OrderNotFoundException extends EntityNotFoundException {
    public OrderNotFoundException(Integer id) {
        super("order with id " + id + " not found");
    }
}
