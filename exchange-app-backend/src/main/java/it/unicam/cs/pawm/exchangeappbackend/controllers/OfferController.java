package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.OfferDTO;
import it.unicam.cs.pawm.exchangeappbackend.mappers.OfferMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offers")
public class OfferController {
    private final OfferService offerService;
    private final OfferMapper offerMapper;

    public OfferController(OfferService offerService, OfferMapper offerMapper) {
        this.offerService = offerService;
        this.offerMapper = offerMapper;
    }

    @PostMapping("/publish")
    public ResponseEntity<String> publishOffer(@RequestParam(name = "id") Long itemId) {
        if (offerService.publishOffer(itemId))
            return ResponseEntity.ok("Offer created.");
        return ResponseEntity.badRequest().body("Offer already present for this item");
    }

    @GetMapping("/user-offers")
    public List<OfferDTO> getUserOffers() {
        return offerService.getUserOffers().stream()
            .map(offerMapper::toDTO)
            .toList();
    }

    @GetMapping("/all-offers")
    public List<OfferDTO> getOffers() {
        return offerService.getOffers().stream()
            .map(offerMapper::toDTO)
            .toList();
    }

    @DeleteMapping("/delete")
    public void deleteOffer(@RequestParam(name = "id") Long id) {
        offerService.removeOffer(id);
    }
}
