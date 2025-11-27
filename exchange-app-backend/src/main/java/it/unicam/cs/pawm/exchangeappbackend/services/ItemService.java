package it.unicam.cs.pawm.exchangeappbackend.services;

import it.unicam.cs.pawm.exchangeappbackend.entities.Item;
import it.unicam.cs.pawm.exchangeappbackend.entities.User;
import it.unicam.cs.pawm.exchangeappbackend.repositories.ItemRepository;
import it.unicam.cs.pawm.exchangeappbackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    /**
     * Adds a new item for the authenticated user only if he has not yet added it.
     *
     * @param item the new item to add.
     * @return true if the new item has been added, false otherwise.
     */
    public boolean addItem(Item item){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        List<Item> items = itemRepository.findByName(item.getName());
        if (!items.isEmpty()) {
            for (Item listItem : items) {
                if (listItem.getOwner().getUsername().equals(username))
                    return false;
            }
        }
        this.addItemForUser(item, username);
        return true;
    }

    private void addItemForUser(Item item, String username) {
        var user = userRepository.findByUsername(username);
        if (user.isPresent()){
            User owner = user.get();
            item.setOwner(owner);
            itemRepository.save(item);
        }
    }

    public List<Item> getUserItems() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent())
            return itemRepository.findByOwner(user.get());

        return Collections.emptyList();
    }

    public List<Item> getUserExchangeableItems() {
        User authUser = authService.getAuthenticatedUser();
        return itemRepository.findByOwner(authUser).stream()
            .filter(item -> item.getCounteroffer() == null && item.getOffer() == null)
            .toList();
    }

    public boolean deleteItemById(Long id) {
        if (isItemDeletable(id)) {
            itemRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private boolean isItemDeletable(Long id) {
        return getUserExchangeableItems()
            .stream()
            .anyMatch(item -> item.getId().equals(id));
    }
}
