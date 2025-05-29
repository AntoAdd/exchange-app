package it.unicam.cs.pawm.exchangeappbackend.controllers;
import it.unicam.cs.pawm.exchangeappbackend.dto.CounterofferDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import it.unicam.cs.pawm.exchangeappbackend.mappers.CounterofferMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.CounterofferService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/counteroffers")
@RequiredArgsConstructor
public class CounterofferController {
    private final CounterofferService counterofferService;
    private final CounterofferMapper counterofferMapper;

    @PostMapping(value = "/publish")
    public CounterofferDTO publishCounteroffer(@RequestParam(name = "id") Long offerId,
                                               @RequestParam(name = "item_IDs") List<Long> itemIDs) {
        Optional<Counteroffer> publishedCounteroffer = counterofferService.publishCounteroffer(offerId, itemIDs);

        return publishedCounteroffer.map(counterofferMapper::toDTO).orElse(null);
    }
}
