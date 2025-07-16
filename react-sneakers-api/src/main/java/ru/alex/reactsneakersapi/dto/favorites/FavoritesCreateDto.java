package ru.alex.reactsneakersapi.dto.favorites;

public record FavoritesCreateDto(
        Integer sneakerId,
        Integer userId
) {
}
