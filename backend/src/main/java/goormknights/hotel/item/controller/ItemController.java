package goormknights.hotel.item.controller;

import goormknights.hotel.item.model.Dining;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.service.ItemService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ItemController {

    private final ItemService itemService;

    // 전체 상품 찾기
    @GetMapping("/items")
    public ResponseEntity<List<Object>> allItems(){
        List<Item> allItem = itemService.findAllItem();
        List<Object> responseItem = itemService.getResponseItem(allItem);

        return ResponseEntity.ok(responseItem);
    }

    @GetMapping("/specialOffer")
    public ResponseEntity<List<Object>> categoryItems(@RequestParam(required = false) String type, @RequestParam(required = false) String typeDetail){
        List<Object> responseItems;

        log.info("type={}", type);
        log.info("typeDetail={}", typeDetail);

        if(type != null && typeDetail != null){
            List<Item> allByType = itemService.findAllByType(type);
            responseItems = itemService.getResponseItem(allByType, typeDetail);
        }

        else if(type != null && typeDetail == null){
            List<Item> allByType = itemService.findAllByType(type);
            responseItems = itemService.getResponseItem(allByType);
        }

        else if(type == null && typeDetail != null){
            List<Item> allByTypeDetail = itemService.findAllByTypeDetail(typeDetail);
            responseItems = itemService.getResponseItem(allByTypeDetail);
        }

        else{
            List<Item> allItems = itemService.findAllItem();
            responseItems = itemService.getResponseItem(allItems);
        }

        return ResponseEntity.ok(responseItems);
    }

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
