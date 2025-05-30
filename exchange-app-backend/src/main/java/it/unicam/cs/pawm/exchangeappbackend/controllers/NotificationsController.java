package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.NotificationDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.mappers.NotificationMapper;
import it.unicam.cs.pawm.exchangeappbackend.model.NotificationPayload;
import it.unicam.cs.pawm.exchangeappbackend.services.AuthService;
import it.unicam.cs.pawm.exchangeappbackend.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationsController {
    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;
    private final AuthService authService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/all")
    public List<NotificationDTO> getAllNotifications() {
        return notificationService.getAllNotifications(authService.getAuthenticatedUser())
            .stream()
            .map(notificationMapper::toNotificationDTO)
            .toList();
    }

    @MessageMapping("/private-notification")
    public void sendNotificationTo(@Payload NotificationPayload payload) {
        System.out.println(payload.username());
        System.out.println(payload.message());
        Notification notification = notificationService.store(payload.username(), payload.message());
        simpMessagingTemplate.convertAndSendToUser(payload.username(), "/private", notificationMapper.toNotificationDTO(notification));
    }
}
