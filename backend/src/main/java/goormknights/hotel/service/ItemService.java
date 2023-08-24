package goormknights.hotel.service;

import goormknights.hotel.model.Item;
import goormknights.hotel.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository<Item> itemRepository;

    public List<Item> findAllItem(){
        return itemRepository.findAll();
    }
}
