package goormknights.hotel.item.controller;

import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/items")
    public ResponseEntity<List<Object>> allItems(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        Page<Item> allItem = itemService.findAllItem(pageable);
        List<Object> responseObjects = itemService.getResponseObjects(allItem);
        int totalPages = allItem.getTotalPages();
        long totalData = allItem.getTotalElements();
        log.info("totalPage={}", totalPages);

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalData))
                .body(responseObjects);
    }

    /**
     * 스페셜오퍼 카테고리화와 검색기능(페이징)
     * @param type - 1차 카테고리
     * @param typeDetail - 2차 카테고리
     * @param keyword - 검색 키워드
     * @return 각 파라미터가 들어있을 때 그것에 해당하는 리스트를 페이징 처리 후 가져온다.
     */
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    @GetMapping("/category")
    public ResponseEntity<List<Object>> categoryItems(@RequestParam(required = false) String type, @RequestParam(required = false) String typeDetail, @RequestParam(required = false) String keyword, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        log.info("type={}", type);
        log.info("typeDetail={}", typeDetail);
        log.info("keyword={}", keyword);

        Page<Item> listByCategory = itemService.getListByCategory(type, typeDetail, keyword, pageable);
        List<Object> responseObjects = itemService.getResponseObjects(listByCategory);
        int totalPages = listByCategory.getTotalPages();
        long totalData = listByCategory.getTotalElements();
        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalData))
                .body(responseObjects);
    }

    // 상품 검색 기능(페이징)
    @GetMapping("/search")
    public ResponseEntity<List<Object>> findItems(@RequestParam String keyword, @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        log.info(keyword);
        Page<Item> byKeyword = itemService.findByKeyword(keyword, pageable);
        List<Object> responseObjects = itemService.getResponseObjects(byKeyword);

        return ResponseEntity.ok(responseObjects);
    }
}
