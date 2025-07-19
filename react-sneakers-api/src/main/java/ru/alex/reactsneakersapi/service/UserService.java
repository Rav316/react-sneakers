package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.repository.UserRepository;
import ru.alex.reactsneakersapi.dto.user.UserReadDto;
import ru.alex.reactsneakersapi.exception.UserNotFoundException;
import ru.alex.reactsneakersapi.mapper.user.UserDetailsMapper;
import ru.alex.reactsneakersapi.mapper.user.UserReadMapper;
import ru.alex.reactsneakersapi.util.AuthUtils;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final UserDetailsMapper userDetailsMapper;
    private final UserReadMapper userReadMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(userDetailsMapper::toDto)
                .orElseThrow(() -> new UsernameNotFoundException("user with email " + email + " not found"));
    }

    public UserReadDto getProfile() {
        String authorizedUserEmail = AuthUtils.getAuthorizedUser().email();
        return userRepository.findByEmail(authorizedUserEmail)
                .map(userReadMapper::toDto)
                .orElseThrow(() -> new UserNotFoundException(authorizedUserEmail));
    }
}
