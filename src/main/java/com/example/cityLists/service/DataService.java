package com.example.cityLists.service;

import com.example.cityLists.model.City;
import com.example.cityLists.model.Country;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DataService {

    private static final List<Country> COUNTRIES = List.of(
            new Country(1, "United States"),
            new Country(2, "France"),
            new Country(3, "Germany"),
            new Country(4, "Japan"),
            new Country(5, "Brazil"),
            new Country(6, "United Kingdom"),
            new Country(7, "Australia"),
            new Country(8, "Canada")
    );

    private static final List<City> CITIES = List.of(
            new City(1,  1, "New York"),
            new City(2,  1, "Los Angeles"),
            new City(3,  1, "Chicago"),
            new City(4,  1, "Houston"),
            new City(5,  1, "Phoenix"),
            new City(6,  1, "Washington D.C."),

            new City(7,  2, "Paris"),
            new City(8,  2, "Marseille"),
            new City(9,  2, "Lyon"),
            new City(10, 2, "Toulouse"),
            new City(11, 2, "Nice"),
            new City(12, 2, "Nantes"),

            new City(13, 3, "Berlin"),
            new City(14, 3, "Hamburg"),
            new City(15, 3, "Munich"),
            new City(16, 3, "Cologne"),
            new City(17, 3, "Frankfurt"),
            new City(18, 3, "Stuttgart"),

            new City(19, 4, "Tokyo"),
            new City(20, 4, "Osaka"),
            new City(21, 4, "Yokohama"),
            new City(22, 4, "Nagoya"),
            new City(23, 4, "Sapporo"),
            new City(24, 4, "Fukuoka"),

            new City(25, 5, "São Paulo"),
            new City(26, 5, "Rio de Janeiro"),
            new City(27, 5, "Brasília"),
            new City(28, 5, "Salvador"),
            new City(29, 5, "Fortaleza"),
            new City(30, 5, "Curitiba"),

            new City(31, 6, "London"),
            new City(32, 6, "Birmingham"),
            new City(33, 6, "Manchester"),
            new City(34, 6, "Glasgow"),
            new City(35, 6, "Liverpool"),
            new City(36, 6, "Leeds"),

            new City(37, 7, "Sydney"),
            new City(38, 7, "Melbourne"),
            new City(39, 7, "Brisbane"),
            new City(40, 7, "Perth"),
            new City(41, 7, "Adelaide"),
            new City(42, 7, "Canberra"),

            new City(43, 8, "Toronto"),
            new City(44, 8, "Montreal"),
            new City(45, 8, "Vancouver"),
            new City(46, 8, "Calgary"),
            new City(47, 8, "Edmonton"),
            new City(48, 8, "Ottawa")
    );

    public List<Country> getAllCountries() {
        return COUNTRIES;
    }

    public List<City> getCitiesByCountry(int countryId) {
        return CITIES.stream().filter(c -> c.countryId() == countryId).toList();
    }

    public Optional<City> getCityById(int id) {
        return CITIES.stream().filter(c -> c.id() == id).findFirst();
    }
}
