package it.unicam.cs.pawm.exchangeappbackend.repositories;

import it.unicam.cs.pawm.exchangeappbackend.entities.Trade;
import org.springframework.data.repository.CrudRepository;

public interface TradeRepository extends CrudRepository<Trade, Long> {
}
