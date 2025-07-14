package ru.alex.reactsneakersapi.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.reactsneakersapi.database.entity.User;
import ru.alex.reactsneakersapi.database.repository.UserRepository;
import ru.alex.reactsneakersapi.dto.user.UserAuthDto;
import ru.alex.reactsneakersapi.dto.user.UserRegisterDto;
import ru.alex.reactsneakersapi.mapper.user.UserAuthMapper;
import ru.alex.reactsneakersapi.mapper.user.UserLoginDto;
import ru.alex.reactsneakersapi.mapper.user.UserRegisterMapper;

import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {
    @Value("${app.host-address}")
    private String hostAddress;

    @Value("${app.email-confirmation}")
    private Boolean emailConfirmation;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final UserRegisterMapper userRegisterMapper;
    private final UserAuthMapper userAuthMapper;
    private final UserRepository userRepository;

    @Transactional
    public UserAuthDto register(UserRegisterDto userDto, HttpServletRequest request) {
        User user = userRegisterMapper.toEntity(userDto);
        String uuid = UUID.randomUUID().toString();
        user.setUuid(uuid);
        if(!emailConfirmation) {
            user.setIsActivated(true);
        }
        User createdUser = userRepository.save(user);
        String authToken = jwtService.generateAuthToken(userDto.email());
        UserAuthDto userAuthDto = userAuthMapper.toDto(createdUser, authToken);
        if(emailConfirmation) {
            String scheme = request.getScheme();
            int serverPort = request.getServerPort();
            String link = scheme + "://" + hostAddress + ":" + serverPort + "/api/auth/activate/" + uuid;
            emailService.sendActivationMail(userAuthDto, link);
        }
        return userAuthDto;
    }

    @Transactional
    public void activateAccount(String uuid) {
        User user = userRepository.findByUuid(uuid)
                .orElseThrow(() -> new EntityNotFoundException("user with uuid " + uuid + " not found"));
        user.setIsActivated(true);
        userRepository.save(user);
    }

    @Transactional
    public UserAuthDto login(UserLoginDto userDto) {
        UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
                userDto.email(),
                userDto.password()
        );
        authenticationManager.authenticate(authInputToken);

        User user = userRepository.findByEmail(userDto.email())
                .orElseThrow(() -> new UsernameNotFoundException("user with email " + userDto.email() + " not found"));
        String token = jwtService.generateAuthToken(userDto.email());
        return userAuthMapper.toDto(user, token);
    }

    @Transactional
    public UserAuthDto refreshAuthToken(HttpServletRequest request) {
        return jwtService.refreshAuthToken(request);
    }
}
