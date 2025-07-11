package ru.alex.reactsneakersapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserRegisterDto(
        @NotNull
        String name,
        @NotNull
        @Email
        String email,
        @NotNull
        String password
) {
}