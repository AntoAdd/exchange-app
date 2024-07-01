package it.unicam.cs.pawm.exchangeappbackend.dto;

public class ImageCreationDTO {
    private final byte[] imageFile;

    public ImageCreationDTO(byte[] imageFile) {
        this.imageFile = imageFile;
    }

    public byte[] getImageFile() {
        return imageFile;
    }
}
