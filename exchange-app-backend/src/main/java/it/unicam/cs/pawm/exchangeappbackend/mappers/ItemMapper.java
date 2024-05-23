package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDto;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {
    public Item toItemEntity(ItemDto itemDto){
        return new Item(itemDto.getName(), itemDto.getDescription(), itemDto.getCategory());
    }
}
