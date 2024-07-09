package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "counteroffers")
@NoArgsConstructor
@Setter
@Getter
public class Counteroffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "counteroffer")
    private List<Item> items;
    @ManyToOne
    @JoinColumn(name = "offer_id")
    private Offer offer;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User publisher;
    @Column(name = "creation_date")
    private LocalDate creationDate;

    public Counteroffer(List<Item> items, Offer offer, User publisher, LocalDate creationDate) {
        this.items = items;
        this.offer = offer;
        this.publisher = publisher;
        this.creationDate = creationDate;
        setItemsCounteroffer(items);
    }

    private void setItemsCounteroffer(List<Item> items) {
        items.forEach(item -> item.setCounteroffer(this));
    }
}
