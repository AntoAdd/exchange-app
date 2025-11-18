package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import it.unicam.cs.pawm.exchangeappbackend.entities.Trade;

import java.util.List;

public interface TradeService {
    /**
     * Stores a new closed trade.
     *
     * @param offer the offer in the closed trade.
     * @param counteroffer the counteroffer in the closed trade.
     * @return the stored trade.
     */
    Trade storeTrade(Offer offer, Counteroffer counteroffer);

    /**
     * Returns the current trades for the requesting user.
     *
     * @return the list of user trades.
     */
    List<Trade> getUserTrades();

    /**
     * Clears the trades history for the requesting user.
     */
    void clearTradesHistory();
}
