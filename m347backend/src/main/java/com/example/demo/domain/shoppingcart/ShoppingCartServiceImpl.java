package com.example.demo.domain.shoppingcart;

import com.example.demo.core.generic.AbstractRepository;
import com.example.demo.core.generic.AbstractServiceImpl;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.UUID;

@Service
public class ShoppingCartServiceImpl extends AbstractServiceImpl<ShoppingCart> implements ShoppingCartService {

    public ShoppingCartServiceImpl(AbstractRepository<ShoppingCart> repository) {
        super(repository);
    }

    public ShoppingCart getShoppingCartById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Shopping cart not found"));
    }
}