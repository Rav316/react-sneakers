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

import java.util.List;

import static ru.alex.reactsneakersapi.util.AuthUtils.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SneakerService {
    private final SneakerRepository sneakerRepository;
    private final UserRepository userRepository;

    public Page<SneakerListDto> findAll(SneakerFilter filter, Pageable pageable) {
        return sneakerRepository.findAllListItems(isUserAuthorized() ? getAuthorizedUserId() : null, filter, pageable);
    }

    @Transactional
    public void syncGuestFavorites(List<Integer> sneakerIds) {
        sneakerRepository.addFavoritesBatch(sneakerIds, getAuthorizedUserId());
    }

    @Transactional
    public void addToFavorite(Integer id) {
        Sneaker sneaker = sneakerRepository.findById(id)
                .orElseThrow(() -> new SneakerNotFoundException(id));
        User user = userRepository.findById(getAuthorizedUserId())
                .orElseThrow(() -> new UserNotFoundException(id));
        user.getFavoriteSneakers().add(sneaker);
        userRepository.save(user);
    }

    @Transactional
    public void removeFromFavorites(Integer id) {
        Sneaker sneaker = sneakerRepository.findById(id)
                .orElseThrow(() -> new SneakerNotFoundException(id));
        User user = userRepository.findById(getAuthorizedUserId())
                .orElseThrow(() -> new UserNotFoundException(id));
        user.getFavoriteSneakers().remove(sneaker);
        userRepository.save(user);
    }
}
