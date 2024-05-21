package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.util.List;

public class ItemDto {
    private final String name;
    private final String description;


    public ItemDto(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
