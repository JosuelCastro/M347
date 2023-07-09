package com.example.demo.domain.shoppingcart;

import com.example.demo.core.generic.AbstractEntity;
import com.example.demo.domain.cartitem.CartItem;
import com.example.demo.domain.item.Item;
import com.example.demo.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "shopping_cart")
public class ShoppingCart extends AbstractEntity {

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();

}
