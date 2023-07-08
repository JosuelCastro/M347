package com.example.demo.domain.item;

import com.example.demo.core.generic.AbstractRepository;
import com.example.demo.core.generic.AbstractServiceImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl extends AbstractServiceImpl<Item> implements ItemService {

    public ItemServiceImpl(AbstractRepository<Item> repository) {
        super(repository);
    }

    @Override
    public List<Item> findAll(int page, int pageSize, String sortBy, boolean asc) {
        Pageable pageable = PageRequest.of(page, pageSize, asc ? Sort.by(sortBy).ascending() : Sort.by(sortBy)
                .descending());
        return repository.findAll(pageable).stream().toList();
    }

}
