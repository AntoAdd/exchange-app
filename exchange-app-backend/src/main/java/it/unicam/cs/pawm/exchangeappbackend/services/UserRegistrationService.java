package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {
    private final UserRepository userRepository;

    public void createUser(User user){
        userRepository.save(user);
    }

    public boolean checkIfAlreadyRegistered(User user){
        return userRepository.existsByUsername(user.getUsername());
    }
}
