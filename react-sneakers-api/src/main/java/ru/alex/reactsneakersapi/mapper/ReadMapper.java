package ru.alex.reactsneakersapi.mapper;

public abstract class ReadMapper<E, D> implements Mapper {
    public abstract D toDto(E entity);
}
