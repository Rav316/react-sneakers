package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.repository.SneakerRepository;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerReadDto;
import ru.alex.reactsneakersapi.exception.SneakerNotFoundException;
import ru.alex.reactsneakersapi.mapper.sneaker.SneakerListMapper;
import ru.alex.reactsneakersapi.mapper.sneaker.SneakerReadMapper;

import java.util.List;

import static ru.alex.reactsneakersapi.util.AuthUtils.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SneakerService {
    private final SneakerRepository sneakerRepository;
    private final SneakerListMapper sneakerListMapper;
    private final SneakerReadMapper sneakerReadMapper;

    public Page<SneakerListDto> findAll(SneakerFilter filter, Pageable pageable) {
        return sneakerRepository.findAllListItems(isUserAuthorized() ? getAuthorizedUser().id() : null, filter, pageable);
    }

    public List<SneakerListDto> findAllFavorites() {
        return sneakerRepository.findAllFavorites(isUserAuthorized() ? getAuthorizedUser().id() : null)
                .stream()
                .map(sneaker -> sneakerListMapper.toDto(sneaker, true))
                .toList();
    }

    public List<SneakerListDto> findAllByIds(List<Integer> sneakerIds) {
        return sneakerRepository.findAllById(sneakerIds)
                .stream()
                .map(sneaker -> sneakerListMapper.toDto(sneaker, false))
                .toList();
    }

    public SneakerReadDto findById(Integer id) {
        return sneakerRepository.findByIdWithItems(id)
                .map(sneakerReadMapper::toDto)
                .orElseThrow(() -> new SneakerNotFoundException(id));
    }

    @Transactional
    public void syncGuestFavorites(List<Integer> sneakerIds) {
        sneakerRepository.addFavoritesBatch(sneakerIds, getAuthorizedUser().id());
    }

    @Transactional
    public void addToFavorite(Integer id) {
        if (!sneakerRepository.existsById(id)) {
            throw new SneakerNotFoundException(id);
        }
        sneakerRepository.addToFavorite(id, getAuthorizedUser().id());
    }

    @Transactional
    public void removeFromFavorites(Integer id) {
        if(!sneakerRepository.existsById(id)) {
            throw new SneakerNotFoundException(id);
        }
        sneakerRepository.removeFromFavorites(id, getAuthorizedUser().id());
    }

    @Transactional
    public void removeAllFavorites() {
        sneakerRepository.removeAllFavorites(getAuthorizedUser().id());
    }
}
