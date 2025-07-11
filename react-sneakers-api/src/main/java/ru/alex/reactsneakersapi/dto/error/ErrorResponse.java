package ru.alex.reactsneakersapi.dto.error;

import java.time.Instant;

public record ErrorResponse(
        Instant date,
        Object message
) {
}
