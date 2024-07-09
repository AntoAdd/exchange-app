package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Item;

import java.util.List;

public interface CounterofferService {
    boolean publishCounteroffer(Long offerId, List<Long> itemIDs);
}
