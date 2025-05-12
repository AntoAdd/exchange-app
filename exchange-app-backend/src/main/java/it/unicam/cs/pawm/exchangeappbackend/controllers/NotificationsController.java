package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.NotificationDTO;
import it.unicam.cs.pawm.exchangeappbackend.mappers.NotificationMapper;
import it.unicam.cs.pawm.exchangeappbackend.services.AuthService;
import it.unicam.cs.pawm.exchangeappbackend.services.NotificationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationsController {
    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;
    private final AuthService authService;

    public NotificationsController(NotificationService notificationService, NotificationMapper notificationMapper, AuthService authService) {
        this.notificationService = notificationService;
        this.notificationMapper = notificationMapper;
        this.authService = authService;
    }

    @GetMapping("/subscribe/{username}")
    public SseEmitter subscribe(@PathVariable String username) {
            SseEmitter emitter = new SseEmitter();

            emitter.onCompletion(() -> notificationService.unsubscribe(username, emitter));
            emitter.onTimeout(() -> {
                emitter.complete();
                notificationService.unsubscribe(username, emitter);
            });

            notificationService.subscribe(username, emitter);
            return emitter;
    }

    @GetMapping("/all")
    public List<NotificationDTO> getAllNotifications() {
        return notificationService.getAllNotifications(authService.getAuthenticatedUser())
            .stream()
            .map(notificationMapper::toNotificationDTO)
            .toList();
    }
}
