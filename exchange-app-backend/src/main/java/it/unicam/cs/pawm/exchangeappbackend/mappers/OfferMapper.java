package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.OfferDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OfferMapper {
    private final ItemMapper itemMapper;

    public OfferDTO toOfferDTO(Offer offer) {
        ItemDTO itemDto = itemMapper.toItemDto(offer.getOfferItem());
        return new OfferDTO(offer.getId(), offer.getPublisher().getUsername(), itemDto, offer.getCreationDate());
    }
}
