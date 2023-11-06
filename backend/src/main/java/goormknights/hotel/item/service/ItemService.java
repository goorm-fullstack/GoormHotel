package goormknights.hotel.item.service;

import goormknights.hotel.item.dto.response.ResponseDiningDto;
import goormknights.hotel.item.dto.response.ResponseRoomDto;
import goormknights.hotel.item.exception.NotExistItemException;
import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
     * 상품 이름을 통해 상품 조회
     *
     * @param itemName - 상품 이름
     * @return 상품 이름과 같은 상품 조회
     */
    public Item findItem(String itemName) {
        return itemRepository.findByName(itemName).orElseThrow(() -> new NotExistItemException("등록된 상품이 아닙니다."));
    }

    /**
     * 전체 상품 조회(페이징)
     *
     * @return DB에 저장된 전체 상품 목록 페이징처리
     * pathUrl에 param으로 size(목록 갯수)와 page(현재 페이지)값을 넣을 수 있다
     */
    public Page<Item> findAllItem(Pageable pageable) {
        return itemRepository.findAll(pageable);
    }

    public Page<Item> findAllByType(String type, Pageable pageable) {
        return itemRepository.findAllByType(type, pageable);
    }

    public Page<Item> findAllByTypeDetail(String typeDetail, Pageable pageable) {
        return itemRepository.findAllByTypeDetail(typeDetail, pageable);
    }

    /**
     * 상품 검색(페이징)
     *
     * @param keyword - 클라이언트가 검색한 단어
     * @return 검색한 단어가 포함된 상품명으로 페이징 처리되어 아이템 조회
     * pathUrl에 param으로 size(목록 갯수)와 page(현재 페이지)값을 넣을 수 있다
     */
    public Page<Item> findByKeyword(String keyword, Pageable pageable) {
        return itemRepository.findByKeyword(keyword, pageable);
    }

    // List에 있는 Item객체들 Dto화
    public List<Object> getResponseObjects(Page<Item> all) {
        List<Object> allItem = new ArrayList<>();
        for (Item item : all) {
            if (item instanceof Dining) {
                allItem.add(((Dining) item).toResponseDiningDto());
            } else {
                allItem.add(((Room) item).toResponseRoomDto());
            }
        }
        return allItem;
    }

    /**
     * 카테고리와 검색어를 통해 페이징된 상품 리스트 조회
     *
     * @param type       - 타입
     * @param typeDetail - 세부 타입
     * @param keyword    - 검색어
     * @param pageable   - 페이징처리
     * @return 페이징된 상품 리스트
     */
    public Page<Item> getListByCategory(String type, String typeDetail, String keyword, Pageable pageable) {
        Page<Item> result;

        if (type != null && typeDetail != null) {
            Page<Item> allByType = findAllByType(type, pageable);
            List<Item> matchingItems = new ArrayList<>();
            for (Item o : allByType) {
                if ((o.getClass() == Dining.class && ((Dining) o).getTypeDetail().equals(typeDetail)) || (o.getClass() == Room.class && ((Room) o).getTypeDetail().equals(typeDetail))) {
                    matchingItems.add(o);
                }
            }
            result = new PageImpl<>(matchingItems, pageable, matchingItems.size());
        } else if (type != null && typeDetail == null) {
            result = findAllByType(type, pageable);
        } else if (type == null && typeDetail != null) {
            result = findAllByTypeDetail(typeDetail, pageable);
        } else {
            result = findAllItem(pageable);
        }

        if (keyword != null) {
            List<Item> byKeywordList = new ArrayList<>();
            for (Item item : result) {
                if (item.getClass() == Dining.class) {
                    if (((Dining) item).getName().contains(keyword)) {
                        byKeywordList.add(item);
                    }
                } else {
                    if (((Room) item).getName().contains(keyword)) {
                        byKeywordList.add(item);
                    }
                }
            }
            return new PageImpl<>(byKeywordList, pageable, byKeywordList.size());
        } else {
            return result;
        }
    }

    public Object findById(Long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new NotExistItemException("해당 id의 상품을 찾을 수 없습니다. id = " + itemId));

        ResponseRoomDto responseRoomDto = null;
        ResponseDiningDto responseDiningDto = null;
        if (item instanceof Dining) responseDiningDto = (((Dining) item).toResponseDiningDto());
        else responseRoomDto = (((Room) item).toResponseRoomDto());

        if (responseDiningDto != null) return responseDiningDto;
        else return responseRoomDto;
    }
}
