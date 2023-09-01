package goormknights.hotel.service;

import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.request.RequestRoomDto;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.service.RoomService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class RoomServiceTest {

    @Autowired
    private RoomService roomService;

    @Test
    void saveRoom() {

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
        RequestImageDto requestImageDTO = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        RequestRoomDto buildRoom2 = RequestRoomDto.builder()
                .bed("single2")
                .roomChild(3)
                .roomAdult(5)
                .priceChild(10000)
                .spare(3)
                .type("room2")
                .price(1350000)
                .name("grand Room2")
                .typeDetail("VIPRoom2")
                .priceAdult(50000)
                .capacity(10)
                .build();
        RequestImageDto requestImageDto2 = RequestImageDto.builder()
                .originFileName("hello2")
                .fileName("hi2")
                .filePath("here2")
                .build();

        String roomName = roomService.saveRoom(buildRoom, requestImageDTO);
        roomService.saveRoom(buildRoom2, requestImageDto2);

        Room createdRoom = roomService.findByRoomName(roomName);

        assertThat(createdRoom.getTypeDetail()).isEqualTo("VIPRoom");
        assertThat(createdRoom.getThumbnail().getFileName()).isEqualTo("hi");
    }

    @Test
    void deleteRoom() {

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
        RequestImageDto requestImageDTO = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        String roomName = roomService.saveRoom(buildRoom, requestImageDTO);

        roomService.deleteByRoomName(roomName);

        List<Room> allRoom = roomService.findAllRoom("room");

        assertThat(allRoom).isEmpty();
    }

    @Test
    void findById() {

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
        RequestImageDto requestImageDTO = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        String roomName = roomService.saveRoom(buildRoom, requestImageDTO);

        Room findRoom = roomService.findByRoomName(roomName);

        assertThat(findRoom.getTypeDetail()).isEqualTo("VIPRoom");
    }

    @Test
    void findAllDining() {

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
        RequestImageDto requestImageDTO = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        roomService.saveRoom(buildRoom, requestImageDTO);

        List<Room> allRoom = roomService.findAllRoom("room");

        assertThat(allRoom).hasSize(1);
    }
}