package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.User;

public interface AuthService {
    User getAuthenticatedUser();
}
