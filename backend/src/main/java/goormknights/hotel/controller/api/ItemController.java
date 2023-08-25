package goormknights.hotel.controller.api;

import goormknights.hotel.model.Dining;
import goormknights.hotel.model.Item;
import goormknights.hotel.model.Room;
import goormknights.hotel.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

        return ResponseEntity.ok(responseItem);
    }
}
