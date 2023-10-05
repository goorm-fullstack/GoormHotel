package goormknights.hotel.item.controller;

import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.request.RequestRoomDto;
import goormknights.hotel.item.dto.response.ResponseRoomDto;
import goormknights.hotel.item.exception.DuplicatedItemNameException;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.service.ImageService;
import goormknights.hotel.item.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
@Slf4j
public class RoomController {

    private final RoomService roomService;
    private final ImageService imageService;

    /**
     * 객실 생성
     * @param requestRoomDto - 객실 생성시 필요한 정보
     * @param img - 이미지
     * @return 생성 완료시 status 200
     * @throws IOException
     */
    @PostMapping("/room")
    public ResponseEntity<Object> uploadRoom(@Validated @ModelAttribute RequestRoomDto requestRoomDto, @RequestParam MultipartFile img, BindingResult bindingResult) throws IOException {

        if(bindingResult.hasErrors()){
            return ResponseEntity.badRequest().build();
        }else{
            RequestImageDto requestImageDto = imageService.convertToImageDto(img);

            roomService.saveRoom(requestRoomDto, requestImageDto);
            return ResponseEntity.ok().build();
        }
    }

    /**
     * 객실 수정
     * @param roomName - 객실 상품 이름
     * @param requestRoomDto - 수정 내용
     * @param img - 이미지 수정 내용
     * @return 수정된 객실
     * @throws IOException
     */
    @PutMapping("/room/{roomName}")
    public ResponseEntity<ResponseRoomDto> updateRoom(@PathVariable String roomName, @Validated @ModelAttribute RequestRoomDto requestRoomDto, @RequestParam(required = false) MultipartFile img, BindingResult bindingResult) throws IOException {

        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }else{
            ResponseRoomDto responseRoomDto = roomService.modifyRoom(roomName, requestRoomDto, img).toResponseRoomDto();

            return ResponseEntity.ok(responseRoomDto);
        }
    }

    /**
     * 객실 삭제(소프트 딜리트)
     * @param roomName - 객실 상품 이름
     * @return 삭제 완료 시 status 200
     */
    @DeleteMapping("/room/{roomName}")
    public ResponseEntity<Object> deleteRoom(@PathVariable String roomName){
        roomService.deleteByRoomName(roomName);

        return ResponseEntity.ok().build();
    }

    /**
     * 객실명을 통해 객실 조회
     * @param roomName - 객실 상품 이름
     * @return 조회된 객실
     */
    @GetMapping("/room/{roomName}")
    public ResponseEntity<ResponseRoomDto> findOneRoom(@PathVariable String roomName) {
        ResponseRoomDto responseRoomDto = roomService.findByRoomName(roomName).toResponseRoomDto();
        log.info("roomName={}", roomName);

        return ResponseEntity.ok(responseRoomDto);
    }

    /**
     * 페이징된 전체 객실 조회
     * @param pageable - 페이징
     * @return 페이징된 전체 객실 리스트
     * 요청 파라미터에 size(불러올 데이터 양)와 page(현재 페이지) 작성 가능
     * 예) /rooms?size=20&page=1
     */
    @GetMapping
    @CrossOrigin(exposedHeaders = {"TotalPages", "TotalData"})
    public ResponseEntity<List<ResponseRoomDto>> findAllRoom(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable){
        Page<Room> all = roomService.findAll(pageable);
        List<ResponseRoomDto> responseDtoList = roomService.toResponseDtoList(all);
        int totalPages = all.getTotalPages();
        long totalData = all.getTotalElements();

        return ResponseEntity.ok()
                .header("TotalPages", String.valueOf(totalPages))
                .header("TotalData", String.valueOf(totalData))
                .body(responseDtoList);
    }

    /**
     * 전체 객실 조회
     * @return 전체 객실
     */
    @GetMapping("/all")
    public ResponseEntity<List<ResponseRoomDto>> findAll(){
        List<ResponseRoomDto> allWithoutPage = roomService.findAllWithoutPage();
        return ResponseEntity.ok(allWithoutPage);
    }

    @GetMapping("/check")
    public ResponseEntity<String> existsByRoomName(@RequestParam String roomName){
        log.info("roomName={}", roomName);

        if(roomService.existsByName(roomName)){
            String message = new DuplicatedItemNameException("중복된 상품명입니다.").getMessage();
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }else{
            return ResponseEntity.ok("사용 가능한 상품명입니다.");
        }
    }
}
