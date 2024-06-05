package com.ray.api.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "basket")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Basket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="buyer_id")
    private String buyerId;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "basket")
    private Set<BasketItem> basketItems;

    public void addItem(Product product, int quantity) {
        if (product != null) {
            if (basketItems == null) {
                basketItems = new HashSet<>();
            }

            BasketItem existingItem = basketItems.stream()
                                                .filter(i -> i.getProduct().getId().equals(product.getId()))
                                                .findAny().orElse(null);
            if (existingItem != null) {
                int newQuantity = existingItem.getQuantity() + quantity;
                existingItem.setQuantity(newQuantity);
            } else {
                basketItems.add(new BasketItem(product, quantity, this));
            }
        }
    }

    public Basket(String buyerId) {
        this.buyerId = buyerId;
    }
}
