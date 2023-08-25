package goormknights.hotel.controller.api;

import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.request.RequestRoomDTO;
import goormknights.hotel.dto.response.ResponseRoomDTO;
import goormknights.hotel.model.Room;
import goormknights.hotel.service.ImageService;
import goormknights.hotel.service.RoomService;
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
    public ResponseEntity<Object> uploadRoom(@Validated @ModelAttribute RequestRoomDTO requestRoomDTO, @RequestParam MultipartFile img) throws IOException {

        RequestImageDTO requestImageDTO = imageService.convertToImageDTO(img);

        roomService.saveRoom(requestRoomDTO, requestImageDTO);
        return ResponseEntity.ok().build();
    }

    // 객실 수정
    @PutMapping("/room/{roomName}")
    public ResponseEntity<ResponseRoomDTO> updateRoom(@PathVariable String roomName, @Validated @ModelAttribute RequestRoomDTO requestRoomDTO, @RequestParam MultipartFile img) throws IOException {

        ResponseRoomDTO responseRoomDTO = roomService.modifyRoom(roomName, requestRoomDTO, img).toResponseRoomDTO();

        return ResponseEntity.ok(responseRoomDTO);
    }

    //객실 삭제
    @DeleteMapping("/room/{roomName}")
    public ResponseEntity<Object> deleteRoom(@PathVariable String roomName){
        roomService.deleteByRoomName(roomName);

        return ResponseEntity.ok().build();
    }

    // 객실명을 통해 찾기
    @GetMapping("/room/{roomName}")
    public ResponseEntity<ResponseRoomDTO> findOneRoom(@PathVariable String roomName) {
        ResponseRoomDTO responseRoomDTO = roomService.findByRoomName(roomName).toResponseRoomDTO();
        log.info("roomName={}", roomName);

        return ResponseEntity.ok(responseRoomDTO);
    }

    // 전체 객실 찾기
    @GetMapping
    public ResponseEntity<List<ResponseRoomDTO>> findAllRoom(){
        List<Room> allRoom = roomService.findAllRoom("room");
        List<ResponseRoomDTO> toResponseDTOList = new ArrayList<>();

        for (Room room : allRoom) {
            toResponseDTOList.add(room.toResponseRoomDTO());
        }

        return ResponseEntity.ok(toResponseDTOList);
    }
}
