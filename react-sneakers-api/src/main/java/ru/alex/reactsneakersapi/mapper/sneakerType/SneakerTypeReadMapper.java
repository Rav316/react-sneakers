package ru.alex.reactsneakersapi.mapper.sneakerType;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.SneakerType;
import ru.alex.reactsneakersapi.dto.sneakerType.SneakerTypeReadDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class SneakerTypeReadMapper extends ReadMapper<SneakerType, SneakerTypeReadDto> {
    @Override
    public SneakerTypeReadDto toDto(SneakerType entity) {
        return new SneakerTypeReadDto(
                entity.getId(),
                entity.getType()
        );
    }
}
