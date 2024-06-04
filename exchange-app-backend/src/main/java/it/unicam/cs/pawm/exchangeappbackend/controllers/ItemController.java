package it.unicam.cs.pawm.exchangeappbackend.controllers;


import it.unicam.cs.pawm.exchangeappbackend.dto.ItemDto;
import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.ItemImage;
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
    private final ImageMapper imageMapper;

    public ItemController(ItemService itemService, ItemMapper itemMapper, ImageMapper imageMapper) {
        this.itemService = itemService;
        this.itemMapper = itemMapper;
        this.imageMapper = imageMapper;
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addItem(@RequestParam(name = "name") String name,
                                          @RequestParam(name = "description") String description,
                                          @RequestParam(name = "category") String category,
                                          @RequestParam(name = "images") List<MultipartFile> images) {
        ItemDto itemDto = new ItemDto(name, description, category);
        Item newItem = itemMapper.toItemEntity(itemDto);

        List<ItemImage> itemImages = images.stream()
            .map(imageFile -> {
                try {
                    return imageMapper.toImageEntity(imageFile);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            })
            .peek(i -> i.setItem(newItem))
            .collect(Collectors.toList());

        newItem.setItemImages(itemImages);

        if (itemService.addItem(newItem))
            return ResponseEntity.ok().body("New item added: " + itemDto.getName());
        return ResponseEntity.badRequest().body("Item already present: " + itemDto.getName());
    }

}
