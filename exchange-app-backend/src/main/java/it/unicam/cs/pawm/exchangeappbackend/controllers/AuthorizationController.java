package it.unicam.cs.pawm.exchangeappbackend.controllers;

import it.unicam.cs.pawm.exchangeappbackend.dto.UserCreationDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.Role;
import it.unicam.cs.pawm.exchangeappbackend.mappers.UserMapper;
import it.unicam.cs.pawm.exchangeappbackend.repositories.RoleRepository;
import it.unicam.cs.pawm.exchangeappbackend.services.UserRegistrationService;
import it.unicam.cs.pawm.exchangeappbackend.services.security.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequiredArgsConstructor
public class AuthorizationController {
    private final UserRegistrationService userRegistrationService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final RoleRepository roleRepository;
    private final JwtTokenService tokenService;
    private final AuthenticationManager authManager;

    @PostMapping(value = "/register")
    public void registerUser(
        @RequestParam(name = "firstName") String firstName,
        @RequestParam(name = "lastName") String lastName,
        @RequestParam(name = "username") String username,
        @RequestParam(name = "password") String password,
        @RequestParam(name = "address") String address
    ) {
        var userCreationDto = new UserCreationDTO(firstName, lastName, username, password, address);
        var user = userMapper.toUserCreationEntity(userCreationDto);

        if (!userRegistrationService.checkIfAlreadyRegistered(user)) {
            String encodedPassword = "{bcrypt}" + passwordEncoder.encode(user.getPassword());
            Role role = roleRepository.findById(1L).orElseGet(() -> new Role("user"));
            user.setPassword(encodedPassword);
            user.setRoles(Set.of(role));
            userRegistrationService.createUser(user);
        }
    }

    @PostMapping("/authenticate")
    public String login(@RequestParam(name = "username") String username,
                        @RequestParam(name = "password") String password) {
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );
        return tokenService.generateJwtToken(auth);
    }
}
