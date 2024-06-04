package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.entities.ItemImage;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class ImageMapper {
    public ItemImage toImageEntity(MultipartFile imageFile) throws IOException {
        return new ItemImage(imageFile.getBytes());
    }
}
