package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "offers")
@Getter
@Setter
@NoArgsConstructor
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User publisher;
    @OneToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item offerItem;
    @Column(name = "creation_date")
    private LocalDate creationDate;
    private String state;
    @OneToMany(mappedBy = "offer")
    private List<Counteroffer> counteroffers;

    public Offer(User publisher, Item offerItem) {
        this.publisher = publisher;
        this.offerItem = offerItem;
        this.creationDate = LocalDate.now();
        this.state = "Published";
        this.counteroffers = new ArrayList<>();
    }
}
