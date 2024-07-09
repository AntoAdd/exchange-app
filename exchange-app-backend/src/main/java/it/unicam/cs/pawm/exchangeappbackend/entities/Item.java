package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "items")
@Setter
@Getter
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String category;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "item", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Image> images;
    @ManyToOne
    @JoinColumn(name = "counteroffer_id")
    private Counteroffer counteroffer;
    @OneToOne(mappedBy = "offerItem")
    private Offer offer;


    public Item(String name, String description, String category, List<Image> images) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.images = images;
        images.forEach(i -> i.setItem(this));
    }

    public Item(Long id, String name, String description, String category, List<Image> images) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.images = images;
        images.forEach(i -> i.setItem(this));
    }
}
