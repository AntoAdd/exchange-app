package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;

import java.io.File;

@Entity
@Table(name = "item_images")
public class ItemImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private File image;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    public ItemImage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public File getImage() {
        return image;
    }

    public void setImage(File image) {
        this.image = image;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
