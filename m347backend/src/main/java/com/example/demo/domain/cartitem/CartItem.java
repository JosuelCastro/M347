package com.example.demo.domain.cartitem;

import com.example.demo.core.generic.AbstractEntity;
import com.example.demo.domain.item.Item;
import com.example.demo.domain.shoppingcart.ShoppingCart;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cartitem")
public class CartItem extends AbstractEntity {

    @ManyToOne
    private ShoppingCart cart;

    @ManyToOne
    private Item item;

    @NotNull
    private Integer quantity;

}