package it.unicam.cs.pawm.exchangeappbackend.dto;

import java.io.File;

public class ImageDto {
    private final File imageFile;

    public ImageDto(File imageFile) {
        this.imageFile = imageFile;
    }

    public File getImageFile() {
        return imageFile;
    }
}
