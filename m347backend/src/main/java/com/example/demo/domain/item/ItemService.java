package com.example.demo.domain.item;

import com.example.demo.core.generic.AbstractService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService extends AbstractService<Item> {

    List<Item> findAll(int page, int pageSize, String sortBy, boolean asc);

}
