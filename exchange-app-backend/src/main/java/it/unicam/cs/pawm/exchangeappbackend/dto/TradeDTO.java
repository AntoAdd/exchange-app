package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.time.LocalDate;

public record TradeDTO(Long id, OfferDTO offer, CounterofferDTO counteroffer, LocalDate closedDate) {
}
