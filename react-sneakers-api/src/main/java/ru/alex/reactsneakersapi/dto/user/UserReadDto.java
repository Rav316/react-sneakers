package ru.alex.reactsneakersapi.dto.user;

public record UserReadDto (
        Integer id,
        String name,
        String email,
        Boolean isActivated
) {
}
