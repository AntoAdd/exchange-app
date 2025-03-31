package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.services.CounterofferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/counteroffers")
@RequiredArgsConstructor
public class CounterofferController {
    private final CounterofferService counterofferService;

    @PostMapping(value = "/publish")
    public ResponseEntity<String> publishCounteroffer(@RequestParam(name = "id") Long offerId,
                                                      @RequestParam(name = "item_IDs") List<Long> itemIDs) {
        boolean isPublished = counterofferService.publishCounteroffer(offerId, itemIDs);

        if (isPublished)
            return ResponseEntity.ok("Counteroffer for offer id " + offerId + " created.");

        return ResponseEntity.badRequest().body("Counteroffer already present for offer id " + offerId);
    }
}
