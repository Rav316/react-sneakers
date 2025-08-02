package ru.alex.reactsneakersapi.mapper.user;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.dto.user.UserEditDto;
import ru.alex.reactsneakersapi.mapper.EditMapper;

@Component
@RequiredArgsConstructor
public class UserEditMapper extends EditMapper<User, UserEditDto> {
    private final PasswordEncoder passwordEncoder;

    @Override
    @CacheEvict(value = "users", key = "#result.email")
    public User updateFromDto(User entity, UserEditDto dto) {
        if(dto.name() != null) {
            entity.setName(dto.name());
        }
        if(dto.email() != null) {
            entity.setEmail(dto.email());
        }
        if(dto.newPassword() != null) {
            entity.setPassword(passwordEncoder.encode(dto.newPassword()));
        }
        return entity;
    }
}
