package it.unicam.cs.pawm.exchangeappbackend.model.users;

import it.unicam.cs.pawm.exchangeappbackend.entities.Role;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class AppUser implements UserDetails {

    private User user;

    public AppUser(String firstName,
                   String lastName,
                   String address,
                   String username,
                   String password){
        this.user = new User(firstName, lastName, address, username, password, Set.of(new Role("user")));
    }

    public User getUser() {
        return user;
    }

    public Long getId() {
        return user.getId();
    }

    public String getFirstName(){
        return user.getFirstName();
    }

    public String getLastName(){
        return user.getLastName();
    }

    public String getAddress(){
        return user.getAddress();
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles()
            .stream()
            .map(AppUserRole::new)
            .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
