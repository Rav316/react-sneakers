package ru.alex.reactsneakersapi.mapper.user;

import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.dto.user.UserDetailsDto;
import ru.alex.reactsneakersapi.mapper.ReadMapper;

@Component
public class UserDetailsMapper extends ReadMapper<User, UserDetailsDto> {
    @Override
    public UserDetailsDto toDto(User entity) {
        return new UserDetailsDto(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getPassword()
        );
    }
}
