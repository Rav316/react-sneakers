package ru.alex.reactsneakersapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserRegisterDto(
        @NotNull
        @Size(min = 2)
        String name,
        @NotNull
        @Email
        String email,
        @NotNull
        @Size(min = 4)
        String password
) {
}