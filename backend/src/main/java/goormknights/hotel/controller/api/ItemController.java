package goormknights.hotel.controller.api;

import goormknights.hotel.model.Dining;
import goormknights.hotel.model.Item;
import goormknights.hotel.model.Room;
import goormknights.hotel.service.ItemService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
        List<Object> responseItem = getResponseItem(allItem);

        return ResponseEntity.ok(responseItem);
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
        List<Object> responseItem = getResponseItem(searchResult);

        return ResponseEntity.ok(responseItem);
    }

    @NotNull
    private static List<Object> getResponseItem(List<Item> allItem) {
        List<Object> responseItem = new ArrayList<>();

        for (Item item : allItem) {
            if(item instanceof Dining) {
                responseItem.add(((Dining) item).toResponseDiningDTO());
                log.info("responseDining={}", item);
            }

            if(item instanceof Room) {
                responseItem.add(((Room) item).toResponseRoomDTO());
                log.info("responseRoom={}", item);
            }
        }
        return responseItem;
    }
}
