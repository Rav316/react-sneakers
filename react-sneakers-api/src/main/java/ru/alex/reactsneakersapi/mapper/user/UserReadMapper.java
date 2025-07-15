package ru.alex.reactsneakersapi.mapper.user;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.dto.user.UserReadDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class UserReadMapper extends ReadMapper<User, UserReadDto> {
    @Override
    public UserReadDto toDto(User entity) {
        return new UserReadDto(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getIsActivated()
        );
    }
}
