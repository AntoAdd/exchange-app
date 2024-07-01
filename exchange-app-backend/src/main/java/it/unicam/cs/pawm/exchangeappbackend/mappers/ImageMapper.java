package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.ImageCreationDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.ImageDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Image;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class ImageMapper {
    public Image toCreateEntity(ImageCreationDTO imageFile) throws IOException {
        return new Image(imageFile.getImageFile());
    }

    public Image toEntity(ImageDTO imageDTO) {
        return new Image(imageDTO.id(), imageDTO.imageFile());
    }

    public ImageDTO toDto(Image image) {
        return new ImageDTO(image.getId(), image.getImage());
    }
}
