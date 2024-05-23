package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "item_images")
public class ItemImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "image_file")
    private byte[] image;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    public ItemImage() {
    }

    public ItemImage(byte[] image) {
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
