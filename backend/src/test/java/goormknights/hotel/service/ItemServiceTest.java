package goormknights.hotel.service;

import goormknights.hotel.item.dto.request.RequestDiningDto;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.request.RequestRoomDto;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.service.DiningService;
import goormknights.hotel.item.service.ItemService;
import goormknights.hotel.item.service.RoomService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    private ItemService itemService;

    @Autowired
    private DiningService diningService;

    @Autowired
    private RoomService roomService;

    @Test
    void findAllItem() {

        RequestDiningDto requestDiningDTO = RequestDiningDto.builder()
                .price(100000)
                .type("dining")
                .name("diningService")
                .useTime("13 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();
        RequestImageDto requestImageDTO = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        diningService.saveDining(requestDiningDTO, requestImageDTO);

        RequestRoomDto buildRoom = RequestRoomDto.builder()
                .bed("single")
                .roomChild(3)
                .roomAdult(5)
                .priceChild(10000)
                .spare(3)
                .type("room")
                .price(1350000)
                .name("grand Room")
                .typeDetail("VIPRoom")
                .priceAdult(50000)
                .capacity(10)
                .build();
        RequestImageDto requestImageDto2 = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        roomService.saveRoom(buildRoom, requestImageDto2);

        List<Item> allItem = itemService.findAllItem();

        Assertions.assertThat(allItem).hasSize(2);
    }
}