package com.example.cityLists.model;

import java.util.List;

public record PagedResponse<T>(List<T> content, int page, int size, long totalElements, int totalPages) {

    public PagedResponse(List<T> content, int page, int size, long totalElements) {
        this(content, page, size, totalElements, (int) Math.ceil((double) totalElements / size));
    }
}
