package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.util.List;

public record ItemDTO(Long id, String name, String description, String category,
                      List<ImageDTO> images) {
}
