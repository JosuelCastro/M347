package com.example.demo.domain.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE')")
    public ResponseEntity<List<Item>> getAll(@RequestParam int pageSize,
                                             @RequestParam int page,
                                             @RequestParam String sortBy,
                                             @RequestParam boolean asc) {
        return new ResponseEntity<>(itemService.findAll(page, pageSize, sortBy, asc), HttpStatus.OK);
    }



}