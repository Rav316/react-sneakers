package ru.alex.reactsneakersapi.exception;

import jakarta.persistence.EntityNotFoundException;

public class SneakerNotFoundException extends EntityNotFoundException {
    public SneakerNotFoundException(Integer id) {
        super("sneaker with id " + id + " not found");
    }
}
