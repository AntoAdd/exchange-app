package it.unicam.cs.pawm.exchangeappbackend.model.users;

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
