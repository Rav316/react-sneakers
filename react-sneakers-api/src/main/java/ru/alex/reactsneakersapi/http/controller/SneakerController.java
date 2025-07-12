package ru.alex.reactsneakersapi.http.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.alex.reactsneakersapi.dto.filter.SneakerFilter;
import ru.alex.reactsneakersapi.dto.response.PageResponse;
import ru.alex.reactsneakersapi.dto.sneaker.SneakerListDto;
import ru.alex.reactsneakersapi.service.SneakerService;

@RestController
@RequestMapping("/api/sneakers")
@RequiredArgsConstructor
public class SneakerController {
    private final SneakerService sneakerService;

    @GetMapping
    public PageResponse<SneakerListDto> findAll(@ModelAttribute SneakerFilter filter, Pageable pageable) {
        return PageResponse.of(sneakerService.findAll(filter, pageable));
    }
}
