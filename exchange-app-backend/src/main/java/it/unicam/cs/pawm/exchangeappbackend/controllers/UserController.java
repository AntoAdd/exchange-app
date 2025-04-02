package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.NotificationDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.mappers.NotificationMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.AuthService;
import it.unicam.cs.pawm.exchangeappbackend.services.NotificationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("users/")
public class UserController {
    private final NotificationService notificationService;
    private final AuthService authService;
    private final NotificationMapper notificationMapper;

    public UserController(NotificationService notificationService, AuthService authService, NotificationMapper notificationMapper) {
        this.notificationService = notificationService;
        this.authService = authService;
        this.notificationMapper = notificationMapper;
    }

    @GetMapping("/notifications")
    public List<NotificationDTO> getAllNotifications() {
        return notificationService.getAllNotifications(authService.getAuthenticatedUser())
            .stream()
            .map(notificationMapper::toNotificationDTO)
            .toList();
    }
}
