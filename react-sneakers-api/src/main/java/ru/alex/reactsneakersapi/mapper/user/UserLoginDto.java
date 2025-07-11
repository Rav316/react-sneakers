package ru.alex.reactsneakersapi.mapper.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserLoginDto(
        @NotNull
        @Email
        String email,
        @NotNull
        String password
) {
}
