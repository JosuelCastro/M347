package com.example.demo.domain.shoppingcart;

import com.example.demo.core.generic.AbstractService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface ShoppingCartService extends AbstractService<ShoppingCart> {

    ShoppingCart getShoppingCartById(UUID id);

    void addItemToCart(UUID cartId, UUID itemId, int quantity);

    void removeItemFromCart(UUID cartId, UUID cartItemId);

}
