package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.UserCreationDto;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toUserCreationEntity(UserCreationDto userCreationDto){
        return new User(userCreationDto.getFirstName(),
                        userCreationDto.getLastName(),
                        userCreationDto.getAddress(),
                        userCreationDto.getUsername(),
                        userCreationDto.getPassword());
    }
}
