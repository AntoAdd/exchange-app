package it.unicam.cs.pawm.exchangeappbackend.dto;

public class UserCreationDto {
    private final String firstName;
    private final String lastName;
    private final String username;
    private final String password;
    private final String address;

    public UserCreationDto(String firstName,
                           String lastName,
                           String username,
                           String password,
                           String address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public String getAddress() {
        return address;
    }
}
