package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.CounterofferDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CounterofferMapper {
    private final ItemMapper itemMapper;

    public CounterofferDTO toDTO(Counteroffer counteroffer) {
        List<ItemDTO> itemsDTOs = counteroffer.getItems().stream()
            .map(itemMapper::toItemDto)
            .toList();

        return new CounterofferDTO(
            counteroffer.getId(),
            itemsDTOs,
            counteroffer.getPublisher().getUsername(),
            counteroffer.getCreationDate(),
            counteroffer.getState()
        );
    }
}
