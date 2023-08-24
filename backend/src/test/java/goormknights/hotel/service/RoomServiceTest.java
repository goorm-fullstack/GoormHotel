package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.request.RequestRoomDTO;
import goormknights.hotel.model.Room;
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
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        RequestRoomDTO buildRoom2 = RequestRoomDTO.builder()
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
        RequestImageDTO requestImageDTO2 = RequestImageDTO.builder()
                .originFileName("hello2")
                .fileName("hi2")
                .filePath("here2")
                .build();

        String roomName = roomService.saveRoom(buildRoom, requestImageDTO);
        roomService.saveRoom(buildRoom2, requestImageDTO2);

        Room createdRoom = roomService.findByRoomName(roomName);

        assertThat(createdRoom.getTypeDetail()).isEqualTo("VIPRoom");
        assertThat(createdRoom.getThumbnail().getFileName()).isEqualTo("hi");
    }

    @Test
    void modifyRoomNoImage() {

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
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        String roomName = roomService.saveRoom(buildRoom, requestImageDTO);

        RequestRoomDTO modifyRoomDTO = RequestRoomDTO.builder()
                .bed("single5")
                .roomChild(3)
                .roomAdult(5)
                .priceChild(10000)
                .spare(3)
                .type("room5")
                .price(1350000)
                .name("grand Room5")
                .typeDetail("VIPRoom5")
                .priceAdult(50000)
                .capacity(10)
                .build();
        RequestImageDTO modifyImageDTO = null;

        String modifiedName = roomService.modifyRoom(roomName, modifyRoomDTO, modifyImageDTO).getName();

        Room modifiedRoom = roomService.findByRoomName(modifiedName);

        assertThat(modifiedRoom.getBed()).isEqualTo("single5");
        assertThat(modifiedRoom.getThumbnail().getFileName()).isEqualTo("hi");
    }

    @Test
    void modifyRoomWithImage() {

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
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        String roomName = roomService.saveRoom(buildRoom, requestImageDTO);

        RequestRoomDTO modifyRoomDTO = RequestRoomDTO.builder()
                .bed("single5")
                .roomChild(3)
                .roomAdult(5)
                .priceChild(10000)
                .spare(3)
                .type("room5")
                .price(1350000)
                .name("grand Room5")
                .typeDetail("VIPRoom5")
                .priceAdult(50000)
                .capacity(10)
                .build();
        RequestImageDTO modifyImageDTO = RequestImageDTO.builder()
                .originFileName("hi")
                .fileName("here")
                .filePath("hello")
                .build();

        String modifiedName = roomService.modifyRoom(roomName, modifyRoomDTO, modifyImageDTO).getName();

        Room modifiedRoom = roomService.findByRoomName(modifiedName);

        assertThat(modifiedRoom.getBed()).isEqualTo("single5");
        assertThat(modifiedRoom.getThumbnail().getFileName()).isEqualTo("here");
    }

    @Test
    void deleteRoom() {

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
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
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
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
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
        RequestImageDTO requestImageDTO = RequestImageDTO.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();

        roomService.saveRoom(buildRoom, requestImageDTO);

        List<Room> allRoom = roomService.findAllRoom("room");

        assertThat(allRoom).hasSize(1);
    }
}