package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.NotificationDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {
    public NotificationDTO toDTO(Notification notification) {
        return new NotificationDTO(notification.getId(), notification.getMessage());
    }
}
