package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;

import java.util.List;

public interface NotificationService {
    /**
     * Adds a new notification for the specified user.
     *
     * @param message the message of the notification.
     * @param user the user to be notified.
     */
    void addNotification(String message, User user);

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
