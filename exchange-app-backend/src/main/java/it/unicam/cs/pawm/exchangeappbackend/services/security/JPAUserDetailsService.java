package it.unicam.cs.pawm.exchangeappbackend.services.security;

import it.unicam.cs.pawm.exchangeappbackend.model.security.SecurityUser;
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

        return user
            .map(SecurityUser::new)
            .orElseThrow(() -> new UsernameNotFoundException("User not found for username " + username));
    }
}
