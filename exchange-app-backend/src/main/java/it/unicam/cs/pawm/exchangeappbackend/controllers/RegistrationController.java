package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.UserCreationDto;
import it.unicam.cs.pawm.exchangeappbackend.entities.Role;
import it.unicam.cs.pawm.exchangeappbackend.mappers.UserMapper;
import it.unicam.cs.pawm.exchangeappbackend.repositories.RoleRepository;
import it.unicam.cs.pawm.exchangeappbackend.services.UserRegistrationService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.Set;

@RestController
public class RegistrationController {
    private final UserRegistrationService userRegistrationService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;

    public RegistrationController(UserRegistrationService userRegistrationService,
                                  PasswordEncoder passwordEncoder,
                                  UserMapper userMapper,
                                  RoleRepository roleRepository) {
        this.userRegistrationService = userRegistrationService;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.roleRepository = roleRepository;
    }
    @PostMapping("/register")
    public void registerUser(@RequestBody UserCreationDto userCreationDto){
        var user = userMapper.toUserCreationEntity(userCreationDto);
        if (!userRegistrationService.checkIfAlreadyRegistered(user)){
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            Role role = roleRepository.findById(1L).orElseGet(() -> new Role("user"));
            user.setPassword(encodedPassword);
            user.setRoles(Set.of(role));
            userRegistrationService.createUser(user);
        }
    }
}
