package it.unicam.cs.pawm.exchangeappbackend.repositories;

import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface OfferRepository extends CrudRepository<Offer, Long> {
    Optional<Offer> findByOfferItem(Item item);
    List<Offer> findByPublisher(User user);
}
