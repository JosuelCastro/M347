package com.example.demo.domain.shoppingcart;

import com.example.demo.domain.item.Item;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/shoppingcart")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    public ShoppingCartController(ShoppingCartService shoppingCartService) {
        this.shoppingCartService = shoppingCartService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingCart> getShoppingCartById(@PathVariable UUID id) {
        ShoppingCart shoppingCart = shoppingCartService.getShoppingCartById(id);
        return ResponseEntity.ok(shoppingCart);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE')")
    public ResponseEntity<ShoppingCart> createShoppingCart(@RequestBody ShoppingCart shoppingCart) {
        return new ResponseEntity<>(shoppingCartService.save(shoppingCart), HttpStatus.CREATED);
    }

    @PostMapping("/{cartId}/item")
    public ResponseEntity<Void> addItemToCart(
            @PathVariable UUID cartId,
            @RequestParam UUID itemId,
            @RequestParam int quantity) {
        shoppingCartService.addItemToCart(cartId, itemId, quantity);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{cartId}/item/{cartItemId}")
    public ResponseEntity<Void> removeItemFromCart(
            @PathVariable UUID cartId,
            @PathVariable UUID cartItemId) {
        shoppingCartService.removeItemFromCart(cartId, cartItemId);
        return ResponseEntity.ok().build();
    }

}
