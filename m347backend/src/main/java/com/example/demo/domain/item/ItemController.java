package com.example.demo.domain.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("")
    public ResponseEntity<List<Item>> getAllItems(@RequestParam int pageSize,
                                                  @RequestParam int page,
                                                  @RequestParam String sortBy,
                                                  @RequestParam boolean asc) {
        return new ResponseEntity<>(itemService.findAll(page, pageSize, sortBy, asc), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable UUID id) {
        return new ResponseEntity<>(itemService.findById(id), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE') or @userPermissionEvaluator.isOwnItem(authentication.principal.user,#item.user.id)")
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        return new ResponseEntity<>(itemService.save(item), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE') or @userPermissionEvaluator.isOwnItem(authentication.principal.user,#item.user.id)")
    public ResponseEntity<Item> updateItem(@PathVariable UUID id, @RequestBody Item item) {
        return new ResponseEntity<>(itemService.updateById(id, item), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE') or @userPermissionEvaluator.isOwnItem(authentication.principal.user,#item.user.id)")
    public ResponseEntity<Void> deleteItem(@PathVariable UUID id) {
        itemService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}