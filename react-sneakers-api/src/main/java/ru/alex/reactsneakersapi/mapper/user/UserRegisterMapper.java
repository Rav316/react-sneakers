package ru.alex.reactsneakersapi.mapper.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.dto.user.UserRegisterDto;
import ru.alex.reactsneakersapi.mapper.CreateMapper;

@Component
@RequiredArgsConstructor
public class UserRegisterMapper extends CreateMapper<User, UserRegisterDto> {
    private final PasswordEncoder passwordEncoder;
    @Override
    public User toEntity(UserRegisterDto dto) {
        return User.builder()
                .name(dto.name())
                .email(dto.email())
                .password(passwordEncoder.encode(dto.password()))
                .isActivated(false)
                .build();
    }
}
