package it.unicam.cs.pawm.exchangeappbackend.model.users;

import lombok.Getter;

@Getter
public record AppUser(String firstName, String lastName, String username, String address) {

    @Override
    public String toString() {
        return "AppUser{" +
            "firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", username='" + username + '\'' +
            ", address='" + address + '\'' +
            '}';
    }
}
