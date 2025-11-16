package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;

import java.util.List;
import java.util.Optional;

public interface OfferService {
    Optional<Offer> publishOffer(Long itemId);
    Offer removeOffer(Long id);

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

    /**
     * Returns the offer with the given id. If no offer exists for the given id, an
     * <code>Optional.empty</code> object is returned.
     *
     * @param id the given id.
     * @return the offer corresponding to the given id, or <code>Optional.empty</code>.
     */
    Optional<Offer> getOffer(Long id);
}
