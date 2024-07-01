package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;

public interface OfferService {
    boolean publishOffer(Item item);
    boolean removeOffer(Offer offer);
}
