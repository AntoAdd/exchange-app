package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.repositories.OfferRepository;
import org.springframework.stereotype.Service;

@Service
public class OfferServiceImpl implements OfferService {
    private final OfferRepository offerRepository;
    private final AuthService authService;


    public OfferServiceImpl(OfferRepository offerRepository, AuthService authService) {
        this.offerRepository = offerRepository;
        this.authService = authService;
    }

    @Override
    public boolean publishOffer(Item item) {
        if (isValidForOffer(item)) {
            User publisher = authService.getAuthenticatedUser();
            Offer offer = new Offer(publisher, item);
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
}
