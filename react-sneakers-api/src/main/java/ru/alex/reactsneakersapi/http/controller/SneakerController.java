package ru.alex.reactsneakersapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;
import ru.alex.reactsneakersapi.dto.response.PageResponse;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.service.SneakerService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/sneakers")
@RequiredArgsConstructor
public class SneakerController {
    private final SneakerService sneakerService;

    @GetMapping
    public PageResponse<SneakerListDto> findAll(@ModelAttribute SneakerFilter filter, Pageable pageable) {
        return PageResponse.of(sneakerService.findAll(filter, pageable));
    }

    @PutMapping("/sync-favorites")
    public ResponseEntity<HttpStatus> syncGuestFavorites(@RequestBody List<Integer> sneakerIds) {
        sneakerService.syncGuestFavorites(sneakerIds);
        return new ResponseEntity<>(OK);
    }

    @PutMapping("/{id}/favorite")
    public ResponseEntity<HttpStatus> addToFavorites(@PathVariable("id") Integer id) {
        sneakerService.addToFavorite(id);
        return new ResponseEntity<>(OK);
    }

    @DeleteMapping("/{id}/favorite")
    public ResponseEntity<HttpStatus> removeFromFavorites(@PathVariable("id") Integer id) {
        sneakerService.removeFromFavorites(id);
        return new ResponseEntity<>(OK);
    }
}
