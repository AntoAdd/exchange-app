package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDto;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.mappers.ItemMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/items")
public class ItemController {
    private final ItemService itemService;
    private final ItemMapper itemMapper;

    public ItemController(ItemService itemService, ItemMapper itemMapper) {
        this.itemService = itemService;
        this.itemMapper = itemMapper;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addItem(@RequestBody ItemDto itemDto){
        Item newItem = itemMapper.toItemEntity(itemDto);
        if (itemService.addItem(newItem))
            return ResponseEntity.ok().body("New item added: " + itemDto.getName());
        return ResponseEntity.badRequest().body("Item already present: " + itemDto.getName());
    }

}
