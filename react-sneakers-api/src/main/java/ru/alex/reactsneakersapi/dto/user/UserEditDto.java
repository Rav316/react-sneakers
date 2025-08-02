package ru.alex.reactsneakersapi.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserEditDto (
        @Size(min = 2, max = 32)
        String name,
        @Email
        String email,
        @Size(min = 4)
        String password,
        @Size(min = 4)
        String newPassword
) {
}
