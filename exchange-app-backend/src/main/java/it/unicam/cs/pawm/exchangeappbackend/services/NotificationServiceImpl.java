package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.mappers.NotificationMapper;
import it.unicam.cs.pawm.exchangeappbackend.repositories.NotificationRepository;
import it.unicam.cs.pawm.exchangeappbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    private void store(Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    public Notification store(String username, String message) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Notification notification = new Notification(message, user);
        store(notification);
        return notification;
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
