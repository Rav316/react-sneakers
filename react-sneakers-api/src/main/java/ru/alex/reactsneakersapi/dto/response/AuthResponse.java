package ru.alex.reactsneakersapi.dto.response;

import ru.alex.reactsneakersapi.dto.user.UserReadDto;

public record AuthResponse (
        UserReadDto user,
        String token
) {

}
