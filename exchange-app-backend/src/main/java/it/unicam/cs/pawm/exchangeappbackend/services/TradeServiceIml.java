package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import it.unicam.cs.pawm.exchangeappbackend.entities.Trade;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.repositories.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeServiceIml implements TradeService{
    private final TradeRepository tradeRepository;
    private final AuthService authService;

    @Override
    public Trade storeTrade(Offer offer, Counteroffer counteroffer) {
        Trade trade = new Trade(offer, counteroffer);
        tradeRepository.save(trade);
        return trade;
    }

    @Override
    public List<Trade> getUserTrades() {
        User user = authService.getAuthenticatedUser();
        List<Trade> trades = new ArrayList<>();

        tradeRepository.findAll().forEach(trades::add);

        return trades.stream()
            .filter(
                trade -> trade.getOfferPublisher().equals(user) && !trade.isDeletedByOfferUser() ||
                trade.getCounterofferPublisher().equals(user) && !trade.isDeletedByCounterofferUser()
            )
            .toList();
    }

    @Override
    public void clearTradesHistory() {
        User user = authService.getAuthenticatedUser();
        List<Trade> trades = new ArrayList<>();

        tradeRepository.findAll().forEach(trades::add);

        List<Trade> userTrades = trades.stream()
            .filter(trade -> trade.getOfferPublisher().equals(user) ||
            trade.getCounterofferPublisher().equals(user))
            .toList();

        userTrades.forEach(trade -> {
            if(trade.getOfferPublisher().equals(user))
                trade.setDeletedByOfferUser(true);
            else
                trade.setDeletedByCounterofferUser(true);
        });

        List<Trade> tradesToDelete = new ArrayList<>();
        List<Trade> tradesToUpdate = new ArrayList<>();

        userTrades.forEach(trade -> {
            if(trade.isDeletedByOfferUser() && trade.isDeletedByCounterofferUser())
                tradesToDelete.add(trade);
            else
                tradesToUpdate.add(trade);
        });

        tradeRepository.saveAll(tradesToUpdate);
        tradeRepository.deleteAll(tradesToDelete);
    }
}
