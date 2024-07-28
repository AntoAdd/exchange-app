package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.time.LocalDate;
import java.util.List;

public record OfferDTO(Long id, String publisherUsername, ItemDTO offerItem, LocalDate publicationDate, List<CounterofferDTO> counteroffers) {
}
