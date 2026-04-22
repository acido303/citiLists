package com.example.cityLists.service;

import com.example.cityLists.model.City;
import com.example.cityLists.model.Country;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class DataServiceTest {

    private final DataService service = new DataService();

    @Test
    void getAllCountries_returnsAllEight() {
        List<Country> countries = service.getAllCountries();
        assertThat(countries).hasSize(8);
    }

    @Test
    void getAllCountries_containsExpectedNames() {
        List<String> names = service.getAllCountries().stream().map(Country::name).toList();
        assertThat(names).contains("United States", "France", "Japan");
    }

    @Test
    void getCitiesByCountry_returnsSixCitiesForValidCountry() {
        List<City> cities = service.getCitiesByCountry(1);
        assertThat(cities).hasSize(6);
    }

    @Test
    void getCitiesByCountry_allBelongToRequestedCountry() {
        List<City> cities = service.getCitiesByCountry(3);
        assertThat(cities).allMatch(c -> c.countryId() == 3);
    }

    @Test
    void getCitiesByCountry_unknownCountryReturnsEmpty() {
        List<City> cities = service.getCitiesByCountry(999);
        assertThat(cities).isEmpty();
    }

    @Test
    void getCityById_returnsCorrectCity() {
        Optional<City> city = service.getCityById(1);
        assertThat(city).isPresent();
        assertThat(city.get().name()).isEqualTo("New York");
    }

    @Test
    void getCityById_unknownIdReturnsEmpty() {
        assertThat(service.getCityById(999)).isEmpty();
    }
}
