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

    /**
     * 상품 검색
     * @param keyword - 클라이언트가 검색한 단어
     * @return 검색한 단어가 포함된 상품명으로 아이템 조회
     */
    public List<Item> findByKeyword(String keyword){
        return itemRepository.findByKeyword(keyword);
    }
}
