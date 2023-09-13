package goormknights.hotel.item.controller;

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
     * 스페셜오퍼 카테고리화와 검색기능(페이징)
     * @param type - 1차 카테고리
     * @param typeDetail - 2차 카테고리
     * @param keyword - 검색 키워드
     * @return 각 파라미터가 들어있을 때 그것에 해당하는 리스트를 페이징 처리 후 가져온다.
     */
    @GetMapping("/specialOffer")
    public ResponseEntity<List<Object>> categoryItems(@RequestParam(required = false) String type, @RequestParam(required = false) String typeDetail, @RequestParam(required = false) String keyword, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        log.info("type={}", type);
        log.info("typeDetail={}", typeDetail);
        log.info("keyword={}", keyword);

        return itemService.getListResponseEntity(type, typeDetail, keyword, pageable);
    }

    // 상품 검색 기능(페이징)
    @GetMapping("/search")
    public ResponseEntity<List<Object>> findItems(@RequestParam String keyword, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        log.info(keyword);
        List<Object> searchResult = itemService.findByKeyword(keyword, pageable);

        return ResponseEntity.ok(searchResult);
    }
}
