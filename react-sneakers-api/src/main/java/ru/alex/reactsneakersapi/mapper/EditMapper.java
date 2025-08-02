package ru.alex.reactsneakersapi.mapper;

public abstract class EditMapper<E, D> implements Mapper {
    public abstract E updateFromDto(E entity, D dto);
}
