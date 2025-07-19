package ru.alex.reactsneakersapi.dto.sneakerItem;

public record SneakerItemReadDto (
        Integer id,
        Integer sneakerId,
        Integer size
) {
}
