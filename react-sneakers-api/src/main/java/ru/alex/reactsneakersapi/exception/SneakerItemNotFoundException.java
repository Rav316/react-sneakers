package ru.alex.reactsneakersapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class SneakerItemNotFoundException extends EntityNotFoundException {
    public SneakerItemNotFoundException(Integer id) {
        super("sneaker item with id " + id + " not found");
    }
}
