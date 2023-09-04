package goormknights.hotel.item.service;

import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.repository.ItemRepository;
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

    /**
     * 전체 상품 조회
     * @return DB에 저장된 전체 상품 목록
     */
    public List<Item> findAllItem(){
        return itemRepository.findAll();
    }

    public List<Item> findAllByType(String type){
        return itemRepository.findAllByType(type);
    }

    public List<Item> findAllByTypeDetail(String typeDetail){
        return itemRepository.findAllByTypeDetail(typeDetail);
    }

    /**
     * 상품 검색
     * @param keyword - 클라이언트가 검색한 단어
     * @return 검색한 단어가 포함된 상품명으로 아이템 조회
     */
    public List<Item> findByKeyword(String keyword){
        return itemRepository.findByKeyword(keyword);
    }

    /**
     * 스페셜 오퍼에서 사용할 검색 기능
     * @param allItem - 타입에 따라 분류된 아이템 리스트
     * @param keyword - 클라이언트가 검색한 단어
     * @return 타입에 따라 분류된 아이템 리스트에서 검색한 단어가 포함되는 아이템 조회
     */
    public List<Item> findByKeyword(List<Object> allItem, String keyword){
        List<Item> result = new ArrayList<>();

        List<Item> byKeyword = itemRepository.findByKeyword(keyword);

        for (Item item : byKeyword) {
            if(allItem.contains(item)){
                result.add(item);
            }
        }

        return result;
    }

    public List<Object> getResponseItem(List<Item> allItem) {
        List<Object> responseItems = new ArrayList<>();

        for (Item item : allItem) {
            if(item instanceof Dining) {
                responseItems.add(((Dining) item).toResponseDiningDto());
            }

            if(item instanceof Room) {
                responseItems.add(((Room) item).toResponseRoomDto());
            }
        }
        return responseItems;
    }

    public List<Object> getResponseItem(List<Item> allItem, String typeDetail) {
        List<Object> responseItems = new ArrayList<>();

        for (Item item : allItem) {
            if(item.getTypeDetail().equals(typeDetail) && item instanceof Dining){
                responseItems.add(((Dining) item).toResponseDiningDto());
            }

            if(item.getTypeDetail().equals(typeDetail) && item instanceof Room){
                responseItems.add(((Room) item).toResponseRoomDto());
                }
        }
        return responseItems;
    }
}
