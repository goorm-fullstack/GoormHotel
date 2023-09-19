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
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository<Item> itemRepository;

    public Item findItem(String itemName){
        return itemRepository.findByName(itemName).orElseThrow(() -> new NotExistItemException("등록된 상품이 아닙니다."));
    }

    /**
     * 전체 상품 조회(페이징)
     * @return DB에 저장된 전체 상품 목록 페이징처리
     * pathUrl에 param으로 size(목록 갯수)와 page(현재 페이지)값을 넣을 수 있다
     */
    public List<Object> findAllItem(Pageable pageable){
        Page<Item> all = itemRepository.findAll(pageable);
        return getResponseObjects(all);
    }

    public List<Object> findAllByType(String type, Pageable pageable){
        Page<Item> allByType = itemRepository.findAllByType(type, pageable);
        return getResponseObjects(allByType);
    }

    public List<Object> findAllByTypeDetail(String typeDetail, Pageable pageable){
        Page<Item> allByTypeDetail = itemRepository.findAllByTypeDetail(typeDetail, pageable);
        return getResponseObjects(allByTypeDetail);
    }

    /**
     * 상품 검색(페이징)
     * @param keyword - 클라이언트가 검색한 단어
     * @return 검색한 단어가 포함된 상품명으로 페이징 처리되어 아이템 조회
     * pathUrl에 param으로 size(목록 갯수)와 page(현재 페이지)값을 넣을 수 있다
     */
    public List<Object> findByKeyword(String keyword, Pageable pageable){
        Page<Item> byKeyword = itemRepository.findByKeyword(keyword, pageable);
        return getResponseObjects(byKeyword);
    }

    // List에 있는 Item객체들 Dto화
    private static List<Object> getResponseObjects(Page<Item> all) {
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

    public ResponseEntity<List<Object>> getListResponseEntity(String type, String typeDetail, String keyword, Pageable pageable) {
        List<Object> responseItems = new ArrayList<>();

        if(type != null && typeDetail != null){
            List<Object> allByType = findAllByType(type, pageable);
            for (Object o : allByType) {
                if((o.getClass() == ResponseDiningDto.class && ((ResponseDiningDto) o).getTypeDetail().equals(typeDetail)) || (o.getClass() == ResponseRoomDto.class && ((ResponseRoomDto) o).getTypeDetail().equals(typeDetail))){
                    responseItems.add(o);
                }
            }
        }
        else if(type != null && typeDetail == null){
            List<Object> allByType = findAllByType(type, pageable);
            responseItems.addAll(allByType);
        }
        else if(type == null && typeDetail != null){
            List<Object> allByTypeDetail = findAllByTypeDetail(typeDetail, pageable);
            responseItems.addAll(allByTypeDetail);
        }
        else{
            List<Object> allItem = findAllItem(pageable);
            responseItems.addAll(allItem);
        }

        if(keyword != null){
            List<Object> byKeywordList = new ArrayList<>();
            for (Object responseItem : responseItems) {
                if(responseItem.getClass() == ResponseDiningDto.class){
                    if(((ResponseDiningDto) responseItem).getName().contains(keyword)){
                        byKeywordList.add(responseItem);
                    }
                }else{
                    if(((ResponseRoomDto) responseItem).getName().contains(keyword)){
                        byKeywordList.add(responseItem);
                    }
                }
            }
            return ResponseEntity.ok(byKeywordList);
        }else{
            return ResponseEntity.ok(responseItems);
        }
    }
}
