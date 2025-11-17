package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;

import java.util.List;
import java.util.Optional;

public interface OfferService {
    Optional<Offer> publishOffer(Long itemId);

    Offer removeOffer(Long id);

    /**
     * Deletes the counteroffer with the given identifier.
     *
     * @param offerId the offer id for which the counteroffer was published.
     * @param counterofferId the id of the counteroffer to be deleted.
     * @return the deleted counteroffer.
     */
    Counteroffer deleteCounteroffer(Long offerId, Long counterofferId);

    /**
     * Accepts the counteroffer identified by the given id.
     *
     * @param counterofferId the id of the counteroffer to accept.
     * @return the accepted counteroffer.
     */
    Counteroffer acceptCounteroffer(Long counterofferId);
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
