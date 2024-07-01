package it.unicam.cs.pawm.exchangeappbackend.mappers;

import it.unicam.cs.pawm.exchangeappbackend.dto.UserCreationDTO;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toUserCreationEntity(UserCreationDTO userCreationDto){
        return new User(userCreationDto.firstName(),
                        userCreationDto.lastName(),
                        userCreationDto.address(),
                        userCreationDto.username(),
                        userCreationDto.password());
    }
}
