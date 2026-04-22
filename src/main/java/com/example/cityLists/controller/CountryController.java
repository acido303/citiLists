package com.example.cityLists.controller;

import com.example.cityLists.model.Country;
import com.example.cityLists.service.DataService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin
public class CountryController {

    private final DataService dataService;

    public CountryController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Country> getAll() {
        return dataService.getAllCountries();
    }
}
