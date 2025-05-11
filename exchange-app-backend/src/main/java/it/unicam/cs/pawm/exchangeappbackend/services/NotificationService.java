package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface NotificationService {
    /**
     * Subscribes the user with the given username to the notification service.
     *
     * @param username the given username.
     * @param emitter the emitter to be associated to the given username.
     */
    void subscribe(String username, SseEmitter emitter);

    /**
     * Unsubscribes the user with the given username from the notification service.
     *
     * @param username the given username.
     * @param emitter the emitter associated to the given username.
     */
    void unsubscribe(String username, SseEmitter emitter);

    /**
     * Sends a new notification to the specified user and stores it in the database.
     *
     * @param message the message of the notification.
     * @param user the user to be notified.
     */
    void sendNotification(String message, User user);

    /**
     * Deletes the notification with the given id.
     *
     * @param id the notification's id.
     */
    void deleteNotification(Long id);

    /**
     * Deletes all the notifications of the given user.
     *
     * @param user the given user.
     */
    void deleteAllNotifications(User user);

    /**
     * Returns the list of all notifications for the given user.
     *
     * @param user the user for whom retrieve all notifications.
     * @return the list of all user's notifications (if the user hasn't received any
     *         notification, an empty list is returned).
     */
    List<Notification> getAllNotifications(User user);
}
