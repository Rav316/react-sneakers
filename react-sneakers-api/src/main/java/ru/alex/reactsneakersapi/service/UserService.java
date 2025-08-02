package ru.alex.reactsneakersapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.database.repository.UserRepository;
import ru.alex.reactsneakersapi.dto.user.UserEditDto;
import ru.alex.reactsneakersapi.dto.user.UserReadDto;
import ru.alex.reactsneakersapi.exception.UserNotFoundException;
import ru.alex.reactsneakersapi.mapper.user.UserDetailsMapper;
import ru.alex.reactsneakersapi.mapper.user.UserEditMapper;
import ru.alex.reactsneakersapi.mapper.user.UserReadMapper;

import static ru.alex.reactsneakersapi.util.AuthUtils.getAuthorizedUser;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserDetailsMapper userDetailsMapper;
    private final UserReadMapper userReadMapper;
    private final UserEditMapper userEditMapper;

    @Cacheable(value = "users", key = "#email")
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(userDetailsMapper::toDto)
                .orElseThrow(() -> new UsernameNotFoundException("user with email " + email + " not found"));
    }

    public UserReadDto getProfile() {
        String authorizedUserEmail = getAuthorizedUser().email();
        return userRepository.findByEmail(authorizedUserEmail)
                .map(userReadMapper::toDto)
                .orElseThrow(() -> new UserNotFoundException(authorizedUserEmail));
    }

    @Transactional
    public UserReadDto updateProfile(UserEditDto userEditDto) {
        Integer userId = getAuthorizedUser().id();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        if(userEditDto.password() != null && userEditDto.newPassword() != null
                && !passwordEncoder.matches(userEditDto.password(), user.getPassword())) {
            throw new AccessDeniedException("the current password is incorrect");
        }

        User updatedUser = userEditMapper.updateFromDto(user, userEditDto);
        return userReadMapper.toDto(userRepository.save(updatedUser));
//        return userRepository.findById(userId)
//                .map(user -> userEditMapper.updateFromDto(user, userEditDto))
//                .map(userRepository::save)
//                .map(userReadMapper::toDto)
//                .orElseThrow(() -> new UserNotFoundException(userId));
    }
}
