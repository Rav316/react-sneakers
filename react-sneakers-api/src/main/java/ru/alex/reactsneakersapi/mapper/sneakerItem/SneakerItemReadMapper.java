package ru.alex.reactsneakersapi.mapper.sneakerItem;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.SneakerItem;
import ru.alex.reactsneakersapi.dto.sneakerItem.SneakerItemReadDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class SneakerItemReadMapper extends ReadMapper<SneakerItem, SneakerItemReadDto> {
    @Override
    public SneakerItemReadDto toDto(SneakerItem entity) {
        return new SneakerItemReadDto(
                entity.getId(),
                entity.getSneaker().getId(),
                entity.getSize()
        );
    }
}
