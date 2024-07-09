package it.unicam.cs.pawm.exchangeappbackend.repositories;

import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CounterofferRepository extends CrudRepository<Counteroffer, Long> {
    List<Counteroffer> findByPublisher(User publisher);
}
