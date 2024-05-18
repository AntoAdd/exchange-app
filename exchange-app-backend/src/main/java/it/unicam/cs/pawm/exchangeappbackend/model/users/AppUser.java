package it.unicam.cs.pawm.exchangeappbackend.model.users;

import java.util.Objects;

public class AppUser {
    private final String firstName;
    private final String lastName;
    private final String username;
    private final String address;

    public AppUser(String firstName, String lastName, String username, String address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.address = address;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getAddress() {
        return address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AppUser appUser = (AppUser) o;
        return Objects.equals(firstName, appUser.firstName) && Objects.equals(lastName, appUser.lastName) && Objects.equals(username, appUser.username) && Objects.equals(address, appUser.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, username, address);
    }

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
