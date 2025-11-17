package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.repositories.CounterofferRepository;
import it.unicam.cs.pawm.exchangeappbackend.repositories.ItemRepository;
import it.unicam.cs.pawm.exchangeappbackend.repositories.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {
    private final OfferRepository offerRepository;
    private final CounterofferRepository counterofferRepository;
    private final ItemRepository itemRepository;
    private final AuthService authService;

    @Override
    public Optional<Offer> publishOffer(Long itemId) {
        Optional<Item> item = itemRepository.findById(itemId);
        if (item.isPresent()) {
            Item offerItem = item.get();
            if (isValidForOffer(offerItem)) {
                User publisher = authService.getAuthenticatedUser();
                Offer offer = new Offer(publisher, offerItem);
                offerRepository.save(offer);
                return Optional.of(offer);
            }
        }
        return Optional.empty();
    }

    private boolean isValidForOffer(Item item) {
        return offerRepository.findByOfferItem(item).isEmpty();
    }

    @Override
    public Offer removeOffer(Long id) {
        Offer offerToDelete = offerRepository.findById(id).orElseThrow();
        offerToDelete.getCounteroffers().forEach(counteroffer -> {
            counteroffer.getItems().forEach(item -> item.setCounteroffer(null));
            counterofferRepository.delete(counteroffer);
        });
        offerRepository.delete(offerToDelete);

        return offerToDelete;
    }

    @Override
    public Counteroffer deleteCounteroffer(Long offerId, Long counterofferId) {
        Offer offer = offerRepository.findById(offerId).orElseThrow();

        Counteroffer counterofferToDelete = offer.getCounteroffers().stream()
            .filter(counteroffer -> counteroffer.getId().equals(counterofferId))
            .findFirst().orElseThrow();

        counterofferToDelete.getItems().forEach(item -> item.setCounteroffer(null));

        offer.getCounteroffers().remove(counterofferToDelete);

        counterofferRepository.delete(counterofferToDelete);

        return counterofferToDelete;
    }

    @Override
    public Counteroffer acceptCounteroffer(Long counterofferId) {
        Counteroffer counteroffer = counterofferRepository.findById(counterofferId).orElseThrow(() -> new IllegalArgumentException("No offer found for the given id: " + counterofferId));
        Offer offer = counteroffer.getOffer();

        List<Counteroffer> refusedCounteroffers = offer.getCounteroffers().stream()
            .filter(c -> !c.getId().equals(counterofferId))
            .toList();

        refusedCounteroffers
            .forEach(c -> c.getItems().forEach(i -> i.setCounteroffer(null)));


        refusedCounteroffers.forEach(counterofferRepository::delete);
        offer.getCounteroffers().removeAll(refusedCounteroffers);

        counteroffer.setState("Accepted");
        offer.setState("Closed");

        counterofferRepository.save(counteroffer);
        offerRepository.save(offer);

        return counteroffer;
    }

    @Override
    public List<Offer> getUserOffers() {
        User auth = authService.getAuthenticatedUser();
        return offerRepository.findByPublisher(auth).stream()
            .filter(offer -> offer.getState().equals("Published"))
            .toList();
    }

    @Override
    public List<Offer> getOffers() {
        List<Offer> allOffers = new ArrayList<>();
        offerRepository.findAll().forEach(allOffers::add);

        return allOffers.stream()
            .filter(offer -> offer.getState().equals("Published"))
            .toList();
    }

    @Override
    public Optional<Offer> getOffer(Long id) {
        return offerRepository.findById(id);
    }
}
