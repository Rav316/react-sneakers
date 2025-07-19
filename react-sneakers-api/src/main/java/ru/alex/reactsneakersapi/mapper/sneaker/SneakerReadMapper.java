package ru.alex.reactsneakersapi.mapper.sneaker;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerReadDto;
import ru.alex.reactsneakersapi.dto.sneakerItem.SneakerItemReadDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;
import ru.alex.reactsneakersapi.mapper.sneakerItem.SneakerItemReadMapper;
import ru.alex.reactsneakersapi.mapper.sneakerType.SneakerTypeReadMapper;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SneakerReadMapper extends ReadMapper<Sneaker, SneakerReadDto> {
    private final SneakerItemReadMapper sneakerItemReadMapper;
    private final SneakerTypeReadMapper sneakerTypeReadMapper;

    @Override
    public SneakerReadDto toDto(Sneaker entity) {
        List<SneakerItemReadDto> items = entity.getItems()
                .stream()
                .map(sneakerItemReadMapper::toDto)
                .toList();

        return new SneakerReadDto(
                entity.getId(),
                entity.getName(),
                sneakerTypeReadMapper.toDto(entity.getType()),
                entity.getImageUrl(),
                entity.getPrice(),
                entity.getDescription(),
                entity.getFirm().getName(),
                items
        );
    }
}
