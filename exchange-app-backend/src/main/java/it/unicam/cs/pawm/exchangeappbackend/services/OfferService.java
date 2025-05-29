package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;

import java.util.List;
import java.util.Optional;

public interface OfferService {
    Optional<Offer> publishOffer(Long itemId);
    void removeOffer(Long id);

    /**
     * Declines the counteroffer with the given identifier, that was published for the offer
     * specified by the offer id.
     *
     * @param offerId the offer id for which the counteroffer was published.
     * @param counterofferId the id of the counteroffer to be declined.
     */
    void declineCounteroffer(Long offerId, Long counterofferId);

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
