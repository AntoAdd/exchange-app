package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;

import java.util.List;

public interface OfferService {
    boolean publishOffer(Long itemId);
    boolean removeOffer(Offer offer);
    List<Offer> getUserOffers();
}
