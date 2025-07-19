package ru.alex.reactsneakersapi.mapper.sneaker;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.mapper.Mapper;
import ru.alex.reactsneakersapi.mapper.sneakerType.SneakerTypeReadMapper;

@Component
@RequiredArgsConstructor
public class SneakerListMapper implements Mapper {
    private final SneakerTypeReadMapper sneakerTypeReadMapper;

    public SneakerListDto toDto(Sneaker entity, boolean isFavorite) {

        return new SneakerListDto(
                entity.getId(),
                entity.getName(),
                sneakerTypeReadMapper.toDto(entity.getType()),
                entity.getImageUrl(),
                entity.getPrice(),
                entity.getFirm().getId(),
                isFavorite
        );
    }
}
