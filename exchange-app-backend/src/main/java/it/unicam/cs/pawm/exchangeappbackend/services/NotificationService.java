package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Notification;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;

import java.util.List;

public interface NotificationService {
    /**
     * Stores the notification containing the given message and username in the database.
     *
     * @param username the username of the notification's receiver.
     * @param message the content of the notification.
     * @return the notification sent to the user.
     */
    Notification store(String username, String message);


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
