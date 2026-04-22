package com.example.cityLists.controller;

import com.example.cityLists.model.City;
import com.example.cityLists.model.PagedResponse;
import com.example.cityLists.service.DataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin
@Tag(name = "Cities", description = "Retrieve cities by country with pagination")
public class CityController {

    private final DataService dataService;

    public CityController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    @Operation(summary = "Get paginated cities by country")
    public PagedResponse<City> getCitiesByCountry(
            @Parameter(description = "Country ID") @RequestParam int countryId,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "5") int size) {

        List<City> all = dataService.getCitiesByCountry(countryId);
        int from = page * size;
        int to = Math.min(from + size, all.size());
        List<City> content = from >= all.size() ? List.of() : all.subList(from, to);
        return new PagedResponse<>(content, page, size, all.size());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get city details by ID")
    public ResponseEntity<City> getCity(@Parameter(description = "City ID") @PathVariable int id) {
        return dataService.getCityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
