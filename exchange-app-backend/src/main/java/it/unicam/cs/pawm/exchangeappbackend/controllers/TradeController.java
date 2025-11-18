package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.TradeDTO;
import it.unicam.cs.pawm.exchangeappbackend.mappers.TradeMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.TradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/trades")
@RequiredArgsConstructor
public class TradeController {
    private final TradeService tradeService;
    private final TradeMapper tradeMapper;

    @GetMapping("/user-trades")
    public List<TradeDTO> getUserTrades() {
        return tradeService.getUserTrades().stream()
            .map(tradeMapper::toDTO)
            .toList();
    }

    @GetMapping("/clear-history")
    public void clearHistory() {
        tradeService.clearTradesHistory();
    }
}
