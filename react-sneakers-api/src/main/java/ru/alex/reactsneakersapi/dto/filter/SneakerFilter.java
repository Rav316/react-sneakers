package ru.alex.reactsneakersapi.dto.filter;

public record SneakerFilter(
        String search,
        String sort,
        String order
) {
}
