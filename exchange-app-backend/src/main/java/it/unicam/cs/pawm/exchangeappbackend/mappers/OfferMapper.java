package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.CounterofferDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.OfferDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OfferMapper {
    private final ItemMapper itemMapper;
    private final CounterofferMapper counterofferMapper;

    public OfferDTO toDTO(Offer offer) {
        ItemDTO itemDto = itemMapper.toItemDto(offer.getOfferItem());
        List<CounterofferDTO> counteroffers = offer.getCounteroffers().stream()
            .map(counterofferMapper::toDTO)
            .toList();

        return new OfferDTO(
            offer.getId(),
            offer.getPublisher().getUsername(),
            itemDto,
            offer.getCreationDate(),
            counteroffers
            );
    }
}
