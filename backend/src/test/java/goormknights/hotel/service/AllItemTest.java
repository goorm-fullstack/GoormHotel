package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.request.RequestRoomDTO;
import goormknights.hotel.model.Dining;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class AllItemTest {

    @Autowired
    private DiningService diningService;

    @Autowired
    private RoomService roomService;

    @Test
    @Commit
    void allItem() {

        RequestDiningDTO requestDiningDTO = RequestDiningDTO.builder()
                .price(100000)
                .type("dining")
                .name("diningService")
                .useTime("13 : 00")
                .priceAdult(30000)
                .priceChild(10000)
                .typeDetail("detail")
                .build();
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        diningService.saveDining(requestDiningDTO, requestImageDTO);

        RequestRoomDTO buildRoom = RequestRoomDTO.builder()
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
        RequestImageDTO requestImageDTO2 = RequestImageDTO.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        roomService.saveRoom(buildRoom, requestImageDTO2);

        List<Dining> allDining = diningService.findAllDining("dining");

        Assertions.assertThat(allDining).hasSize(1);
    }
}
