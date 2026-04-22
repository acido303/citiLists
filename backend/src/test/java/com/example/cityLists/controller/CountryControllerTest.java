package com.example.cityLists.controller;

import com.example.cityLists.model.Country;
import com.example.cityLists.service.DataService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class CountryControllerTest {

    @Mock
    DataService dataService;

    MockMvc mockMvc;

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(new CountryController(dataService)).build();
    }

    @Test
    void getAll_returnsJsonArray() throws Exception {
        when(dataService.getAllCountries()).thenReturn(List.of(
                new Country(1, "United States"),
                new Country(2, "France")
        ));

        mockMvc.perform(get("/api/countries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("United States"))
                .andExpect(jsonPath("$[1].name").value("France"));
    }

    @Test
    void getAll_emptyList_returnsEmptyArray() throws Exception {
        when(dataService.getAllCountries()).thenReturn(List.of());

        mockMvc.perform(get("/api/countries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }
}
