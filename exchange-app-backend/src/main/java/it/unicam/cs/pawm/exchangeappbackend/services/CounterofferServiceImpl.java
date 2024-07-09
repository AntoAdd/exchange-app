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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CounterofferServiceImpl implements CounterofferService{
    private final AuthService authService;
    private final CounterofferRepository counterofferRepository;
    private final OfferRepository offerRepository;
    private final ItemRepository itemRepository;

    @Override
    public boolean publishCounteroffer(Long offerId, List<Long> itemIDs) {
        User publisher = authService.getAuthenticatedUser();
        List<Counteroffer> publisherCounteroffers = counterofferRepository.findByPublisher(publisher);

        if (validateCounteroffer(offerId, publisherCounteroffers)){
            Offer relatedOffer = offerRepository.findById(offerId).orElseThrow();
            List<Item> counterofferItems = getItemsFromId(itemIDs);
            Counteroffer counteroffer = new Counteroffer(counterofferItems, relatedOffer, publisher, LocalDate.now());
            counterofferRepository.save(counteroffer);
            return true;
        }
        return false;
    }

    private boolean validateCounteroffer(Long offerId, List<Counteroffer> publisherCounteroffers) {
        if (!publisherCounteroffers.isEmpty())
            return validateForOffer(offerId, publisherCounteroffers);

        return true;
    }

    private boolean validateForOffer(Long offerId, List<Counteroffer> publisherCounteroffers) {
        return publisherCounteroffers.stream()
            .map(counteroffer -> counteroffer.getOffer().getId())
            .noneMatch(id -> id.equals(offerId));
    }

    private List<Item> getItemsFromId(List<Long> itemIDs) {
        List<Item> items = new ArrayList<>();

        for (Item item : itemRepository.findAllById(itemIDs))
            items.add(item);

        return items;
    }
}
