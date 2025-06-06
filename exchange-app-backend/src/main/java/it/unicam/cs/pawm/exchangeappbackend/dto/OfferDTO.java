package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.time.LocalDate;
import java.util.List;

public record OfferDTO(Long id, String publisher, ItemDTO offerItem, LocalDate publicationDate, String state, List<CounterofferDTO> counteroffers) {
}
