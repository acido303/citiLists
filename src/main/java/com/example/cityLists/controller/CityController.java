package com.example.cityLists.controller;

import com.example.cityLists.model.City;
import com.example.cityLists.model.PagedResponse;
import com.example.cityLists.service.DataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin
public class CityController {

    private final DataService dataService;

    public CityController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public PagedResponse<City> getCitiesByCountry(
            @RequestParam int countryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        List<City> all = dataService.getCitiesByCountry(countryId);
        int from = page * size;
        int to = Math.min(from + size, all.size());
        List<City> content = from >= all.size() ? List.of() : all.subList(from, to);
        return new PagedResponse<>(content, page, size, all.size());
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCity(@PathVariable int id) {
        return dataService.getCityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
