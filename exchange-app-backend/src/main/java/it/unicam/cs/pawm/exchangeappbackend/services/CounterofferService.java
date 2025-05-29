package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import java.util.List;
import java.util.Optional;

public interface CounterofferService {
    /**
     * Publish a counteroffer with the given items for the offer with the given ID.
     *
     * @param offerId the ID of the offer for which the counteroffer is published.
     * @param itemIDs the IDs of the items that will be exchanged in this counteroffer.
     *
     * @return An optional Counteroffer entity representing the counteroffer published.
     *         If there is an error in the publication of the counteroffer, an <code>Optional.empty()</code>
     *         is returned.
     */
    Optional<Counteroffer> publishCounteroffer(Long offerId, List<Long> itemIDs);
}
