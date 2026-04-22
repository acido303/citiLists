package com.example.cityLists.controller;

import com.example.cityLists.model.Country;
import com.example.cityLists.service.DataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin
@Tag(name = "Countries", description = "Retrieve available countries")
public class CountryController {

    private final DataService dataService;

    public CountryController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    @Operation(summary = "Get all countries")
    public List<Country> getAll() {
        return dataService.getAllCountries();
    }
}
