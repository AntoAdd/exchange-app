package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;

import java.io.File;

@Entity
public class ItemImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private File image;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private ItemEntity item;
}
