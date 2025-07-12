package ru.alex.reactsneakersapi.mapper.sneaker;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class SneakerListMapper extends ReadMapper<Sneaker, SneakerListDto> {
    @Override
    public SneakerListDto toDto(Sneaker entity) {
        return new SneakerListDto(
                entity.getId(),
                entity.getName(),
                entity.getImageUrl(),
                entity.getPrice(),
                entity.getDescription(),
                entity.getFirm().getId()
        );
    }
}
