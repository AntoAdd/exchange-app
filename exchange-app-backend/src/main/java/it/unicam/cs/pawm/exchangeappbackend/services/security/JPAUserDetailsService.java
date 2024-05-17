package it.unicam.cs.pawm.exchangeappbackend.services.security;

import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.model.users.AppUser;
import it.unicam.cs.pawm.exchangeappbackend.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JPAUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public JPAUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findByUsername(username);

        if (user.isPresent()){
            User u = user.get();
            return new AppUser(
                u.getFirstName(), u.getLastName(), u.getAddress(), u.getUsername(), u.getPassword()
            );
        }else
            throw new UsernameNotFoundException("Username not found: " + username);
    }
}
