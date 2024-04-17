package it.unicam.cs.pawm.exchangeappbackend.model.users;

public class User {
    private final Long id;
    private final String name;
    private final String surname;
    private final String address;

    public User(Long id, String name, String surname, String address) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getAddress() {
        return address;
    }
}
