package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.mappers.NotificationMapper;
import it.unicam.cs.pawm.exchangeappbackend.repositories.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class NotificationServiceImpl implements NotificationService{
    private final NotificationRepository notificationRepository;
    private final ConcurrentMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    @Override
    public void subscribe(String username, SseEmitter emitter) {
        emitters.putIfAbsent(username, emitter);
    }

    @Override
    public void unsubscribe(String username, SseEmitter emitter) {
        emitters.remove(username, emitter);
    }

    @Override
    public void sendNotification(String message, User user) {
        Notification notification = new Notification(message, user);
        store(notification);

        SseEmitter emitter = emitters.get(user.getUsername());
        try{
            emitter.send(notificationMapper.toNotificationDTO(notification));
        } catch (Exception e) {
            emitter.complete();
            unsubscribe(user.getUsername(), emitter);
        }

    }

    private void store(Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(Long id) {

    }

    @Override
    public void deleteAllNotifications(User user) {

    }

    @Override
    public List<Notification> getAllNotifications(User user) {
        return notificationRepository.findByUser(user);
    }
}
