package com.example.demo.domain.shoppingcart;

import com.example.demo.core.generic.AbstractRepository;
import com.example.demo.core.generic.AbstractServiceImpl;
import com.example.demo.domain.cartitem.CartItem;
import com.example.demo.domain.cartitem.CartItemRepository;
import com.example.demo.domain.item.Item;
import com.example.demo.domain.item.ItemRepository;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.UUID;

@Service
public class ShoppingCartServiceImpl extends AbstractServiceImpl<ShoppingCart> implements ShoppingCartService {

    private final ItemRepository itemRepository;
    private final CartItemRepository cartItemRepository;

    public ShoppingCartServiceImpl(AbstractRepository<ShoppingCart> repository, ItemRepository itemRepository, CartItemRepository cartItemRepository) {
        super(repository);
        this.itemRepository = itemRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public ShoppingCart getShoppingCartById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Shopping cart not found"));
    }

    @Override
    public void addItemToCart(UUID cartId, UUID itemId, int quantity) {
        ShoppingCart cart = repository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Shopping cart not found"));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new NotFoundException("Item not found"));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setItem(item);
        cartItem.setQuantity(quantity);

        cartItemRepository.save(cartItem);

        cart.getCartItems().add(cartItem);

        repository.save(cart);
    }

    @Override
    public void removeItemFromCart(UUID cartId, UUID cartItemId) {
        ShoppingCart cart = repository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Shopping cart not found"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new NotFoundException("Cart item not found"));

        if (!cart.getCartItems().contains(cartItem)) {
            throw new NotFoundException("Cart item not found in the shopping cart");
        }

        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
    }
}