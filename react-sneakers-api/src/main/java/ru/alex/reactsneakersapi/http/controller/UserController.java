package ru.alex.reactsneakersapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.alex.reactsneakersapi.dto.user.UserEditDto;
import ru.alex.reactsneakersapi.dto.user.UserReadDto;
import ru.alex.reactsneakersapi.service.UserService;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserReadDto> profile() {
        return new ResponseEntity<>(userService.getProfile(), OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserReadDto> updateProfile(@Validated @RequestBody UserEditDto userEditDto) {
        return new ResponseEntity<>(userService.updateProfile(userEditDto), OK);
    }
}
