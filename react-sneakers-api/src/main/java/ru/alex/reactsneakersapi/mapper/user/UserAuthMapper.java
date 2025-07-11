package ru.alex.reactsneakersapi.mapper.user;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.dto.user.UserAuthDto;
import ru.alex.reactsneakersapi.mapper.Mapper;

@Component
public class UserAuthMapper implements Mapper {
    public UserAuthDto toDto(User entity, String token) {
        return new UserAuthDto(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                token,
                entity.getIsActivated()
        );
    }
}
