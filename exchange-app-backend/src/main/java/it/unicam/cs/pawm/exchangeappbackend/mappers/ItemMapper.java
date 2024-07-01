package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.ImageDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.ItemCreationDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.Image;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ItemMapper {
    private final ImageMapper imageMapper;

    public ItemMapper(ImageMapper imageMapper) {
        this.imageMapper = imageMapper;
    }


    public Item toCreateEntity(ItemCreationDTO itemCreationDTO) {
        List<Image> images = itemCreationDTO.images().stream().map(i -> {
            try {
                return imageMapper.toCreateEntity(i);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList();
        return new Item(itemCreationDTO.name(), itemCreationDTO.description(), itemCreationDTO.category(), images);
    }

    public Item toEntity(ItemDTO itemDTO) {
        List<Image> images = itemDTO.images().stream()
            .map(imageMapper::toEntity).toList();
        return new Item(itemDTO.id(), itemDTO.name(), itemDTO.description(), itemDTO.category(), images);
    }

    public ItemDTO toItemDto(Item item) {
        List<ImageDTO> images = item.getImages().stream()
            .map(imageMapper::toDto)
            .toList();
        return new ItemDTO(item.getId(), item.getName(), item.getDescription(), item.getCategory(), images);
    }
}
