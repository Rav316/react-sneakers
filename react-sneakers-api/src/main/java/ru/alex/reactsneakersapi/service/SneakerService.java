package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.repository.SneakerRepository;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.mapper.sneaker.SneakerListMapper;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SneakerService {
    private final SneakerRepository sneakerRepository;
    private final SneakerListMapper sneakerListMapper;

    public Page<SneakerListDto> findAll(SneakerFilter filter, Pageable pageable) {
        return sneakerRepository.findAllListItems(filter, pageable)
                .map(sneakerListMapper::toDto);
    }
}
