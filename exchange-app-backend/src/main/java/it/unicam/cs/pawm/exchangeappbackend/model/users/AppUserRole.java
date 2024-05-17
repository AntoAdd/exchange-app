package it.unicam.cs.pawm.exchangeappbackend.model.users;

import it.unicam.cs.pawm.exchangeappbackend.entities.Role;
import org.springframework.security.core.GrantedAuthority;

public class AppUserRole implements GrantedAuthority {
    private Role role;

    public AppUserRole(Role role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role.getName();
    }
}
