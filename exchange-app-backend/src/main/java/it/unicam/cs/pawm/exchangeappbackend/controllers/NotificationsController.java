package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.NotificationDTO;
import it.unicam.cs.pawm.exchangeappbackend.mappers.NotificationMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.AuthService;
import it.unicam.cs.pawm.exchangeappbackend.services.NotificationService;
import lombok.RequiredArgsConstructor;
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
            .map(notificationMapper::toDTO)
            .toList();
    }

    @GetMapping("/clear-history")
    public void clearNotifications() {
        notificationService.deleteAllNotifications(authService.getAuthenticatedUser());
    }
}
