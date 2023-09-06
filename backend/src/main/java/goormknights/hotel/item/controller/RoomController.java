package goormknights.hotel.item.controller;

import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.request.RequestRoomDto;
import goormknights.hotel.item.dto.response.ResponseRoomDto;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.service.ImageService;
import goormknights.hotel.item.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
@Slf4j
public class RoomController {

    private final RoomService roomService;
    private final ImageService imageService;

    // 객실 생성
    @PostMapping("/room")
    public ResponseEntity<Object> uploadRoom(@Validated @ModelAttribute RequestRoomDto requestRoomDto, @RequestParam MultipartFile img) throws IOException {

        RequestImageDto requestImageDto = imageService.convertToImageDto(img);

        roomService.saveRoom(requestRoomDto, requestImageDto);
        return ResponseEntity.ok().build();
    }

    // 객실 수정
    @PutMapping("/room/{roomName}")
    public ResponseEntity<ResponseRoomDto> updateRoom(@PathVariable String roomName, @Validated @ModelAttribute RequestRoomDto requestRoomDto, @RequestParam MultipartFile img) throws IOException {

        ResponseRoomDto responseRoomDto = roomService.modifyRoom(roomName, requestRoomDto, img).toResponseRoomDto();

        return ResponseEntity.ok(responseRoomDto);
    }

    //객실 삭제
    @DeleteMapping("/room/{roomName}")
    public ResponseEntity<Object> deleteRoom(@PathVariable String roomName){
        roomService.deleteByRoomName(roomName);

        return ResponseEntity.ok().build();
    }

    // 객실명을 통해 찾기
    @GetMapping("/room/{roomName}")
    public ResponseEntity<ResponseRoomDto> findOneRoom(@PathVariable String roomName) {
        ResponseRoomDto responseRoomDto = roomService.findByRoomName(roomName).toResponseRoomDto();
        log.info("roomName={}", roomName);

        return ResponseEntity.ok(responseRoomDto);
    }

    // 전체 객실 찾기
    @GetMapping
    public ResponseEntity<List<ResponseRoomDto>> findAllRoom(){
        List<Room> allRoom = roomService.findAllRoom("room");
        List<ResponseRoomDto> toResponseDtoList = new ArrayList<>();

        for (Room room : allRoom) {
            toResponseDtoList.add(room.toResponseRoomDto());
        }

        return ResponseEntity.ok(toResponseDtoList);
    }
}
