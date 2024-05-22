package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.UserCreationDto;
import it.unicam.cs.pawm.exchangeappbackend.entities.Role;
import it.unicam.cs.pawm.exchangeappbackend.mappers.UserMapper;
import it.unicam.cs.pawm.exchangeappbackend.repositories.RoleRepository;
import it.unicam.cs.pawm.exchangeappbackend.services.UserRegistrationService;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.*;
import java.util.Set;
@CrossOrigin(origins = "http://localhost:3000")
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
    @PostMapping(value = "/register")
    public void registerUser(@RequestParam(name = "firstName") String firstName,
                             @RequestParam(name = "lastName") String lastName,
                             @RequestParam(name = "username") String username,
                             @RequestParam(name = "password") String password,
                             @RequestParam(name = "address") String address){
        var userCreationDto = new UserCreationDto(firstName, lastName, username, password, address);
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
