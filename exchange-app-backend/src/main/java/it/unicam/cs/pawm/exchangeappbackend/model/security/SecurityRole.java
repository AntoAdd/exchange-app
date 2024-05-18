package it.unicam.cs.pawm.exchangeappbackend.model.security;

import it.unicam.cs.pawm.exchangeappbackend.entities.Role;
import org.springframework.security.core.GrantedAuthority;

public class SecurityRole implements GrantedAuthority {
    private final Role role;

    public SecurityRole(Role role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role.getName();
    }
}
