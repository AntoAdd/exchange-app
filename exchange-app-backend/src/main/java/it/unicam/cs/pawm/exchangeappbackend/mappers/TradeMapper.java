package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.TradeDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Trade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class TradeMapper {
    private final OfferMapper offerMapper;
    private final CounterofferMapper counterofferMapper;

    public TradeDTO toDTO(Trade trade) {
        return new TradeDTO(
            trade.getId(),
            offerMapper.toDTO(trade.getOffer()),
            counterofferMapper.toDTO(trade.getCounteroffer()),
            trade.getClosedDate()
        );
    }
}
