package ru.alex.reactsneakersapi.mapper;

public abstract class CreateMapper<E, D> implements Mapper {
    public abstract E toEntity(D dto);
}
