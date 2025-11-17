package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.CounterofferDTO;
import it.unicam.cs.pawm.exchangeappbackend.dto.OfferDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Counteroffer;
import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.entities.Offer;
import it.unicam.cs.pawm.exchangeappbackend.mappers.CounterofferMapper;
import it.unicam.cs.pawm.exchangeappbackend.mappers.NotificationMapper;
import it.unicam.cs.pawm.exchangeappbackend.mappers.OfferMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.CounterofferService;
import it.unicam.cs.pawm.exchangeappbackend.services.NotificationService;
import it.unicam.cs.pawm.exchangeappbackend.services.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/offers")
@RequiredArgsConstructor
public class OfferController {
    private final OfferService offerService;
    private final CounterofferService counterofferService;
    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;
    private final OfferMapper offerMapper;
    private final CounterofferMapper counterofferMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/publish")
    public Optional<OfferDTO> publishOffer(@RequestParam(name = "id") Long itemId) {
        Optional<Offer> offerToPublish = offerService.publishOffer(itemId);

        MessageHeaders headers = new MessageHeaders(
            Map.of("messageType", "OFFER_PUBLISHED")
        );

        offerToPublish.ifPresent(offer -> {
            OfferDTO offerDTO = offerMapper.toDTO(offer);
            messagingTemplate.convertAndSend("/topic/offers", offerDTO, headers);
        });

        return offerToPublish.map(offerMapper::toDTO);
    }

    @GetMapping("/user-offers")
    public List<OfferDTO> getUserOffers() {
        return offerService.getUserOffers().stream()
            .map(offerMapper::toDTO)
            .toList();
    }

    @GetMapping("/all-offers")
    public List<OfferDTO> getOffers() {
        return offerService.getOffers().stream()
            .map(offerMapper::toDTO)
            .toList();
    }

    @DeleteMapping("/delete")
    public OfferDTO deleteOffer(@RequestParam(name = "id") Long id) {
        Offer offerDeleted = offerService.removeOffer(id);

        MessageHeaders headers = new MessageHeaders(
            Map.of("messageType", "OFFER_DELETED")
        );

        messagingTemplate.convertAndSend("/topic/offers", id, headers);

        offerDeleted.getCounteroffers().forEach(counteroffer -> {
            String username = counteroffer.getPublisher().getUsername();
            String message = "Offer #" + id + " has been removed";

            Notification notification = notificationService.store(username, message);

            messagingTemplate.convertAndSendToUser(username, "/private", notificationMapper.toNotificationDTO(notification));
        });

        return offerMapper.toDTO(offerDeleted);
    }

    @PostMapping(value = "/publish-counteroffer")
    public CounterofferDTO publishCounteroffer(@RequestParam(name = "id") Long offerId,
                                               @RequestParam(name = "item_IDs") List<Long> itemIDs) {
        Optional<Counteroffer> publishedCounteroffer = counterofferService.publishCounteroffer(offerId, itemIDs);

        MessageHeaders headers = new MessageHeaders(
            Map.of("messageType", "OFFER_MODIFIED")
        );

        offerService.getOffer(offerId).ifPresent(offer -> {
            OfferDTO offerDTO = offerMapper.toDTO(offer);

            messagingTemplate.convertAndSend("/topic/offers", offerDTO, headers);
        });

        return publishedCounteroffer.map(counterofferMapper::toDTO).orElse(null);
    }

    @DeleteMapping("/decline-counteroffer")
    public void declineCounteroffer(@RequestParam(name = "offerId") Long offerId,
                                    @RequestParam(name = "counterofferId") Long counterofferId) {
        Counteroffer declinedCounteroffer = offerService.deleteCounteroffer(offerId, counterofferId);
        Optional<Offer> modifiedOffer = offerService.getOffer(offerId);

        MessageHeaders headers = new MessageHeaders(
            Map.of("messageType", "OFFER_MODIFIED")
        );

        modifiedOffer.ifPresent(offer -> {
            OfferDTO offerDTO = offerMapper.toDTO(offer);
            messagingTemplate.convertAndSend("/topic/offers", offerDTO, headers);
        });

        String username = declinedCounteroffer.getPublisher().getUsername();
        String message = "Your counteroffer to offer #" + offerId + " has been declined";

        Notification notification = notificationService.store(username, message);

        messagingTemplate.convertAndSendToUser(
            username,
            "/private",
            notificationMapper.toNotificationDTO(notification)
        );
    }

    @DeleteMapping("/delete-counteroffer")
    public void deleteCounteroffer(@RequestParam(name = "offerId") Long offerId,
                                   @RequestParam(name = "counterofferId") Long counterofferId) {
        Counteroffer deletedCounteroffer = offerService.deleteCounteroffer(offerId, counterofferId);
        Optional<Offer> modifiedOffer = offerService.getOffer(offerId);

        MessageHeaders headers = new MessageHeaders(
            Map.of("messageType", "OFFER_MODIFIED")
        );

        modifiedOffer.ifPresent(offer -> {
            OfferDTO offerDTO = offerMapper.toDTO(offer);
            messagingTemplate.convertAndSend("/topic/offers", offerDTO, headers);

            String username = offer.getPublisher().getUsername();
            String message = deletedCounteroffer.getPublisher().getUsername() + " removed counteroffer for your offer (#" + offerId + ")";

            Notification notification = notificationService.store(username, message);

            messagingTemplate.convertAndSendToUser(
                username,
                "/private",
                notificationMapper.toNotificationDTO(notification)
            );
        });
    }
}
