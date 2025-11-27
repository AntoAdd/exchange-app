package it.unicam.cs.pawm.exchangeappbackend.model.items;

import it.unicam.cs.pawm.exchangeappbackend.model.users.AppUser;
import lombok.Getter;
import lombok.Setter;

import java.io.File;
import java.util.List;

/**
 * An exchangeable item belonging to a specific user.
 *
 * It is characterized by the name, the description and a list of images: each of these attributes
 * can be modified by the item's owner.
 */
@Getter
public class Item {
    private final Long id;
    @Setter
    private String name;
    @Setter
    private String description;
    private final List<File> itemImages;
    private final AppUser itemOwner;

    public Item(Long id, String name, String description, List<File> itemImages, AppUser itemOwner) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.itemImages = itemImages;
        this.itemOwner = itemOwner;
    }
}
