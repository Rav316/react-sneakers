package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.entity.Sneaker;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.database.repository.SneakerRepository;
import ru.alex.reactsneakersapi.database.repository.UserRepository;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.exception.SneakerNotFoundException;
import ru.alex.reactsneakersapi.exception.UserNotFoundException;
import ru.alex.reactsneakersapi.mapper.sneaker.SneakerListMapper;

import java.util.List;

import static ru.alex.reactsneakersapi.util.AuthUtils.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SneakerService {
    private final SneakerRepository sneakerRepository;
    private final UserRepository userRepository;
    private final SneakerListMapper sneakerListMapper;

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

    @Transactional
    public void syncGuestFavorites(List<Integer> sneakerIds) {
        sneakerRepository.addFavoritesBatch(sneakerIds, getAuthorizedUser().id());
    }

    @Transactional
    public void addToFavorite(Integer id) {
        Sneaker sneaker = sneakerRepository.findById(id)
                .orElseThrow(() -> new SneakerNotFoundException(id));
        String authorizedUserEmail = getAuthorizedUser().email();
        User user = userRepository.findByEmail(authorizedUserEmail)
                .orElseThrow(() -> new UserNotFoundException(authorizedUserEmail));
        user.getFavoriteSneakers().add(sneaker);
        userRepository.save(user);
    }

    @Transactional
    public void removeFromFavorites(Integer id) {
        Sneaker sneaker = sneakerRepository.findById(id)
                .orElseThrow(() -> new SneakerNotFoundException(id));
        String authorizedUserEmail = getAuthorizedUser().email();
        User user = userRepository.findByEmail(authorizedUserEmail)
                .orElseThrow(() -> new UserNotFoundException(authorizedUserEmail));
        user.getFavoriteSneakers().remove(sneaker);
        userRepository.save(user);
    }

    @Transactional
    public void removeAllFavorites() {
        sneakerRepository.removeAllFavorites(getAuthorizedUser().id());
    }
}
