package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "item_images")
@Setter
@Getter
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "image_file")
    private byte[] image;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    public Image(byte[] image) {
        this.image = image;
    }

    public Image(Long id, byte[] image) {
        this.id = id;
        this.image = image;
    }
}
