package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.mappers.ItemMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/offers")
public class OfferController {
    private final OfferService offerService;
    private final ItemMapper itemMapper;

    public OfferController(OfferService offerService, ItemMapper itemMapper) {
        this.offerService = offerService;
        this.itemMapper = itemMapper;
    }

    @PostMapping("/publish")
    public ResponseEntity<String> publishOffer(@RequestBody ItemDTO itemDTO) {
        Item item = itemMapper.toEntity(itemDTO);
        if (offerService.publishOffer(item))
            return ResponseEntity.ok("Offer created.");
        return ResponseEntity.badRequest().body("Offer already present for this item");
    }
}
