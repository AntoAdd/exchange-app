package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.time.LocalDate;
import java.util.List;

public record CounterofferDTO(Long id, List<ItemDTO> items, String publisherUsername, LocalDate publicationDate, String state) {
}
