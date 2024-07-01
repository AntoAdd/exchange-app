package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.util.List;

public record ItemCreationDTO(String name, String description, String category, List<ImageCreationDTO> images) {
}
