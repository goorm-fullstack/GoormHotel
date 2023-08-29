package goormknights.hotel.item.service;

import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository<Item> itemRepository;

    /**
     * 전체 상품 조회
     * @return DB에 저장된 전체 상품 목록
     */
    public List<Item> findAllItem(){
        return itemRepository.findAll();
    }
}
