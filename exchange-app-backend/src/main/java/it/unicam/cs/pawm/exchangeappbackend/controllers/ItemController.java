package it.unicam.cs.pawm.exchangeappbackend.controllers;


import it.unicam.cs.pawm.exchangeappbackend.dto.ImageCreationDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.ItemCreationDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.mappers.ImageMapper;
import it.unicam.cs.pawm.exchangeappbackend.mappers.ItemMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.ItemService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;
    private final ItemMapper itemMapper;

    public ItemController(ItemService itemService, ItemMapper itemMapper, ImageMapper imageMapper) {
        this.itemService = itemService;
        this.itemMapper = itemMapper;
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addItem(@RequestParam(name = "name") String name,
                                          @RequestParam(name = "description") String description,
                                          @RequestParam(name = "category") String category,
                                          @RequestParam(name = "images") List<MultipartFile> images) {

        List<ImageCreationDTO> imagesDto = images.stream().map(i -> {
            try {
                return new ImageCreationDTO(i.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).toList();

        ItemCreationDTO itemCreationDTO = new ItemCreationDTO(name, description, category, imagesDto);
        Item newItem = itemMapper.toCreateEntity(itemCreationDTO);

        if (itemService.addItem(newItem))
            return ResponseEntity.ok().body("New item added: " + itemCreationDTO.name());
        return ResponseEntity.badRequest().body("Item already present: " + itemCreationDTO.name());
    }

    @GetMapping("/user-items")
    public List<ItemDTO> getUserItems() {
        return itemService.getUserItems()
            .stream()
            .map(itemMapper::toItemDto)
            .collect(Collectors.toList());
    }

    @GetMapping("/user-exchangeable")
    public List<ItemDTO> getUserExchangeableItems() {
        return itemService.getUserExchangeableItems()
            .stream()
            .map(itemMapper::toItemDto)
            .toList();
    }
}
