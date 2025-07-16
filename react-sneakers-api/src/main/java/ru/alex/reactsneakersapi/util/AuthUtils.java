package ru.alex.reactsneakersapi.util;

import com.auth0.jwt.exceptions.JWTVerificationException;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;
import ru.alex.reactsneakersapi.dto.user.UserDetailsDto;

@UtilityClass
public class AuthUtils {

    public static boolean isUserAuthorized() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserDetailsDto;
    }

    public static Integer getAuthorizedUserId() {
        return ((UserDetailsDto)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).id();
    }

    public static String getJwtFromAuthHeader(String authHeader) {
        if (authHeader == null || authHeader.isBlank() || !authHeader.startsWith("Bearer")) {
            throw new JWTVerificationException("token is not valid");
        }

        String jwt = authHeader.substring(7);
        if (jwt.isBlank()) {
            throw new JWTVerificationException("token is not valid");
        }
        return jwt;
    }

}
