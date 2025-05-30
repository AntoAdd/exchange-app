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
    public void removeOffer(Long id) {
        Offer offerToDelete = offerRepository.findById(id).orElseThrow();
        offerToDelete.getCounteroffers().forEach(counteroffer -> {
            counteroffer.getItems().forEach(item -> item.setCounteroffer(null));
            counterofferRepository.delete(counteroffer);
        });
        offerRepository.delete(offerToDelete);
    }

    @Override
    public void declineCounteroffer(Long offerId, Long counterofferId) {
        Offer offer = offerRepository.findById(offerId).orElseThrow();

        Counteroffer counterofferToDecline = offer.getCounteroffers().stream()
                .filter(counteroffer -> counteroffer.getId().equals(counterofferId))
                    .findFirst().orElseThrow();

        counterofferToDecline.getItems().forEach(item -> item.setCounteroffer(null));

        counterofferRepository.delete(counterofferToDecline);
    }

    @Override
    public List<Offer> getUserOffers() {
        User auth = authService.getAuthenticatedUser();
        return offerRepository.findByPublisher(auth);
    }

    @Override
    public List<Offer> getOffers() {
        List<Offer> allOffers = new ArrayList<>();
        offerRepository.findAll().forEach(allOffers::add);
        return allOffers;
    }
}
