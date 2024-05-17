package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.model.users.AppUser;
import it.unicam.cs.pawm.exchangeappbackend.services.UserRegistrationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {
    private final UserRegistrationService userRegistrationService;
    private final PasswordEncoder passwordEncoder;

    public RegistrationController(UserRegistrationService userRegistrationService,
                                  PasswordEncoder passwordEncoder) {
        this.userRegistrationService = userRegistrationService;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/register")
    public void registerUser(@RequestBody AppUser user){
        if (!userRegistrationService.checkIfAlreadyRegistered(user)){
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.getUser().setPassword(encodedPassword);
            userRegistrationService.createUser(user);
        }
    }
}
