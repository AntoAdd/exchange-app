package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;

@Entity
public class ItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity owner;
}
