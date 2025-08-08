package ru.alex.reactsneakersapi.http.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.reactsneakersapi.dto.response.AuthResponse;
import ru.alex.reactsneakersapi.dto.user.UserRegisterDto;
import ru.alex.reactsneakersapi.mapper.user.UserLoginDto;
import ru.alex.reactsneakersapi.service.AuthService;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid UserRegisterDto userRegisterDto) {
        AuthResponse registeredUser = authService.register(userRegisterDto);
        return new ResponseEntity<>(registeredUser, CREATED);
    }

    @GetMapping("/activate/{uuid}")
    public ResponseEntity<HttpStatus> activateAccount(@PathVariable("uuid") String uuid) {
        authService.activateAccount(uuid);
        return new ResponseEntity<>(OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Validated @RequestBody UserLoginDto user) {
        return new ResponseEntity<>(authService.login(user), OK);
    }

    @PutMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshAuthToken(HttpServletRequest request) {
        return new ResponseEntity<>(authService.refreshAuthToken(request), OK);
    }
}
