package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.model.users.AppUser;
import it.unicam.cs.pawm.exchangeappbackend.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserRegistrationService {
    private final UserRepository userRepository;

    public UserRegistrationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(AppUser appUser){
        userRepository.save(appUser.getUser());
    }

    public boolean checkIfAlreadyRegistered(AppUser appUser){
        return userRepository.existsByUsername(appUser.getUsername());
    }
}
