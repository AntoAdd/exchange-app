package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.dto.OfferDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.repositories.ItemRepository;
import it.unicam.cs.pawm.exchangeappbackend.repositories.OfferRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OfferServiceImpl implements OfferService {
    private final OfferRepository offerRepository;
    private final ItemRepository itemRepository;
    private final AuthService authService;


    public OfferServiceImpl(OfferRepository offerRepository, ItemRepository itemRepository, AuthService authService) {
        this.offerRepository = offerRepository;
        this.itemRepository = itemRepository;
        this.authService = authService;
    }

    @Override
    public boolean publishOffer(Long itemId) {
        Item offerItem = itemRepository.findById(itemId).orElseThrow();
        if (isValidForOffer(offerItem)) {
            User publisher = authService.getAuthenticatedUser();
            Offer offer = new Offer(publisher, offerItem);
            offerRepository.save(offer);
            return true;
        }
        return false;
    }

    private boolean isValidForOffer(Item item) {
        return offerRepository.findByOfferItem(item).isEmpty();
    }

    @Override
    public boolean removeOffer(Offer offer) {
        return false;
    }

    @Override
    public List<Offer> getUserOffers() {
        User auth = authService.getAuthenticatedUser();
        return offerRepository.findByPublisher(auth);
    }

    @Override
    public List<Offer> getOffers() {
        List<Offer> allOffers = new ArrayList<>();
        User auth = authService.getAuthenticatedUser();
        offerRepository.findAll().forEach(allOffers::add);
        return allOffers.stream()
            .filter(offer -> !offer.getPublisher().equals(auth))
            .toList();
    }
}
