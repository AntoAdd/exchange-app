package it.unicam.cs.pawm.exchangeappbackend.dto;

public class ImageDto {
    private final byte[] imageFile;

    public ImageDto(byte[] imageFile) {
        this.imageFile = imageFile;
    }

    public byte[] getImageFile() {
        return imageFile;
    }
}
