package it.unicam.cs.pawm.exchangeappbackend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "trades")
@Getter
@Setter
@NoArgsConstructor
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "offer_user_id", referencedColumnName = "id")
    private User offerPublisher;

    @OneToOne
    @JoinColumn(name = "counteroffer_user_id", referencedColumnName = "id")
    private User counterofferPublisher;

    @OneToOne
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    private Offer offer;

    @OneToOne
    @JoinColumn(name = "counteroffer_id", referencedColumnName = "id")
    private Counteroffer counteroffer;

    @Column(name = "closed_date")
    private LocalDate closedDate;

    @Column(name = "deleted_by_offer_user")
    private boolean deletedByOfferUser;

    @Column(name = "deleted_by_counteroffer_user")
    private boolean deletedByCounterofferUser;

    public Trade(Offer offer, Counteroffer counteroffer) {
        this.offerPublisher = offer.getPublisher();
        this.counterofferPublisher = counteroffer.getPublisher();
        this.offer = offer;
        this.counteroffer = counteroffer;
        this.closedDate = LocalDate.now();
        this.deletedByOfferUser = false;
        this.deletedByCounterofferUser = false;
    }
}
