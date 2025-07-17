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

import java.util.Collections;
import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
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

    @GetMapping("/favorites")
    public List<SneakerListDto> findAllFavorites() {
        return sneakerService.findAllFavorites();
    }

    @DeleteMapping("/favorites")
    public ResponseEntity<HttpStatus> removeAllFavorites() {
        sneakerService.removeAllFavorites();
        return new ResponseEntity<>(NO_CONTENT);
    }

    @GetMapping("/by-ids")
    public List<SneakerListDto> findAllByIds(@RequestParam(required = false) List<Integer> sneakerIds) {
        if (sneakerIds == null) {
            sneakerIds = Collections.emptyList();
        }
        return sneakerService.findAllByIds(sneakerIds);
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
        return new ResponseEntity<>(NO_CONTENT);
    }
}
