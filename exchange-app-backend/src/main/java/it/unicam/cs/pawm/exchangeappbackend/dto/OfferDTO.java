package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.time.LocalDate;

public record OfferDTO(Long id, String ownerUsername, ItemDTO offerItem, LocalDate publicationDate) {
}
