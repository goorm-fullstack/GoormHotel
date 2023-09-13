package goormknights.hotel.item.controller;

import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ItemController {

    private final ItemService itemService;

    // 전체 상품 찾기(페이징)
    @GetMapping("/items")
    public ResponseEntity<List<Object>> allItems(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        List<Object> allItem = itemService.findAllItem(pageable);

        return ResponseEntity.ok(allItem);
    }

    /**
     * 스페셜오퍼 카테고리화와 검색기능
     * @param type - 1차 카테고리
     * @param typeDetail - 2차 카테고리
     * @param keyword - 검색 키워드
     * @return 각 파라미터가 들어있을 때 그것에 해당하는 리스트를 가져온다.
     */
//    @GetMapping("/specialOffer")
//    public ResponseEntity<List<Object>> categoryItems(@RequestParam(required = false) String type, @RequestParam(required = false) String typeDetail, @RequestParam(required = false) String keyword){
//        List<Item> allItems;
//        List<Object> responseItems;
//
//        log.info("type={}", type);
//        log.info("typeDetail={}", typeDetail);
//
//        if(type != null && typeDetail != null){
//            allItems = itemService.findAllByType(type);
//            responseItems = itemService.getResponseItem(allItems, typeDetail);
//        }
//        else if(type != null && typeDetail == null){
//            allItems = itemService.findAllByType(type);
//            responseItems = itemService.getResponseItem(allItems);
//        }
//        else if(type == null && typeDetail != null){
//            allItems = itemService.findAllByTypeDetail(typeDetail);
//            responseItems = itemService.getResponseItem(allItems);
//        }
//        else{
//            allItems = itemService.findAllItem();
//            responseItems = itemService.getResponseItem(allItems);
//        }
//
//        if(keyword != null){
//            List<Item> byKeyword = itemService.findByKeyword(responseItems, keyword);
//            responseItems = itemService.getResponseItem(byKeyword);
//        }
//
//        return ResponseEntity.ok(responseItems);
//    }

    /**
     * 상품 검색 기능
     * @param keyword - 클라이언트가 검색한 단어
     * @return 검색 단어가 들어가 있는 상품명을 찾아서 조회
     */
    @GetMapping("/search")
    public ResponseEntity<List<Object>> findItems(@RequestParam String keyword){
        log.info(keyword);
        List<Item> searchResult = itemService.findByKeyword(keyword);
        List<Object> responseItem = itemService.getResponseItem(searchResult);

        return ResponseEntity.ok(responseItem);
    }
}
