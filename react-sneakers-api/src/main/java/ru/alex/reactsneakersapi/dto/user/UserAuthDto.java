package ru.alex.reactsneakersapi.dto.user;

public record UserAuthDto(
        Integer id,
        String name,
        String email,
        String token,
        Boolean isActivated
) {
}
