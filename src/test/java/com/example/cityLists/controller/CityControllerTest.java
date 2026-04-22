package com.example.cityLists.controller;

import com.example.cityLists.model.City;
import com.example.cityLists.service.DataService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CityControllerTest {

    @Mock
    DataService dataService;

    MockMvc mockMvc;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(new CityController(dataService)).build();
    }

    private final List<City> sixCities = List.of(
            new City(1, 1, "New York"),
            new City(2, 1, "Los Angeles"),
            new City(3, 1, "Chicago"),
            new City(4, 1, "Houston"),
            new City(5, 1, "Phoenix"),
            new City(6, 1, "Washington D.C.")
    );

    @Test
    void getCities_firstPage_returnsFiveItems() throws Exception {
        when(dataService.getCitiesByCountry(1)).thenReturn(sixCities);

        mockMvc.perform(get("/api/cities?countryId=1&page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(5))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.totalElements").value(6))
                .andExpect(jsonPath("$.totalPages").value(2));
    }

    @Test
    void getCities_secondPage_returnsRemainingItem() throws Exception {
        when(dataService.getCitiesByCountry(1)).thenReturn(sixCities);

        mockMvc.perform(get("/api/cities?countryId=1&page=1&size=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].name").value("Washington D.C."));
    }

    @Test
    void getCities_pageOutOfRange_returnsEmptyContent() throws Exception {
        when(dataService.getCitiesByCountry(1)).thenReturn(sixCities);

        mockMvc.perform(get("/api/cities?countryId=1&page=5&size=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(0));
    }

    @Test
    void getCities_defaultPageSize_isFive() throws Exception {
        when(dataService.getCitiesByCountry(1)).thenReturn(sixCities);

        mockMvc.perform(get("/api/cities?countryId=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size").value(5));
    }

    @Test
    void getCity_existingId_returnsCity() throws Exception {
        when(dataService.getCityById(1)).thenReturn(Optional.of(new City(1, 1, "New York")));

        mockMvc.perform(get("/api/cities/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("New York"));
    }

    @Test
    void getCity_unknownId_returns404() throws Exception {
        when(dataService.getCityById(999)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/cities/999"))
                .andExpect(status().isNotFound());
    }
}
