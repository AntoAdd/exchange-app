package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;

import java.util.List;

public interface OfferService {
    boolean publishOffer(Long itemId);
    boolean removeOffer(Offer offer);

    /**
     * Returns all the offers published by the authenticated user.
     *
     * @return all the offers published by the authenticated user.
     */
    List<Offer> getUserOffers();

    /**
     * Returns all the published offers that are not published by the authenticated user.
     *
     * @return all the published offers that are not published by the authenticated user.
     */
    List<Offer> getOffers();
}
