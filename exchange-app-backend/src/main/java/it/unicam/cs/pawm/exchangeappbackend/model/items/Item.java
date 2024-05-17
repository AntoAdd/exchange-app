package it.unicam.cs.pawm.exchangeappbackend.model.items;

import it.unicam.cs.pawm.exchangeappbackend.model.users.AppUser;

import java.io.File;
import java.util.List;

/**
 * An exchangeable item belonging to a specific user.
 *
 * It is characterized by the name, the description and a list of images: each of these attributes
 * can be modified by the item's owner.
 */
public class Item {
    private final Long id;
    private String name;
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

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<File> getItemImages() {
        return itemImages;
    }

    public AppUser getItemOwner() {
        return itemOwner;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
