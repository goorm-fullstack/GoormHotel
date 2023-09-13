package goormknights.hotel.item.service;

import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.request.RequestRoomDto;
import goormknights.hotel.item.dto.response.ResponseRoomDto;
import goormknights.hotel.item.exception.NotExistItemException;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.repository.ItemRepository;
import goormknights.hotel.item.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final ItemRepository<Room> itemRepository;
    private final RoomRepository roomRepository;
    private final ImageService imageService;

    /**
     * 객실 DB에 저장
     * @param requestRoomDto - 객실 정보
     * @param requestImageDto - 객실 이미지 정보
     * @return 객실 상품명
     */
    public String saveRoom(RequestRoomDto requestRoomDto, RequestImageDto requestImageDto){
        Room build = requestRoomDto.toEntity().toBuilder()
                .thumbnail(requestImageDto.toEntity())
                .build();
        return itemRepository.save(build).getName();
    }

    /**
     * 객실 수정
     * @param roomName - 객실 상품명
     * @param requestRoomDto - 수정된 객실 정보
     * @param img - 수정된 이미지 정보
     * @return 수정 후 DB에 저장된 객실 엔티티
     */
    public Room modifyRoom(String roomName, RequestRoomDto requestRoomDto, MultipartFile img) throws IOException {
        Room originRoom = findByRoomName(roomName);

        RequestImageDto requestImageDto;
        if(!Objects.requireNonNull(img.getOriginalFilename()).equals("")) {
            requestImageDto = imageService.convertToImageDto(img);
        } else {
            requestImageDto = RequestImageDto.builder()
                    .originFileName(originRoom.getThumbnail().getOriginFileName())
                    .fileName(originRoom.getThumbnail().getFileName())
                    .filePath(originRoom.getThumbnail().getFilePath())
                    .build();
        }

        return itemRepository.save(originRoom.updateRoom(requestRoomDto, requestImageDto));
    }

    /**
     * 객실 삭제
     * @param roomName - 객실 상품명
     */
    public void deleteByRoomName(String roomName){
        roomRepository.deleteByName(roomName);
    }

    /**
     * 객실 상품명을 통해 조회
     * @param roomName - 객실 상품명
     * @return 객실 상품명에 해당하는 객실 엔티티
     */
    public Room findByRoomName(String roomName) {
        return roomRepository.findByName(roomName).orElseThrow(() -> new NotExistItemException("등록된 상품이 아닙니다."));
    }

    /**
     * 객실 전체 조회(페이징)
     * @param type - 1차 카테고리(객실 or 다이닝)
     * @return 페이징 처리된 전체 객실 목록
     * pathUrl에 param으로 size(목록 갯수)와 page(현재 페이지)값을 넣을 수 있다
     */
    public Page<ResponseRoomDto> findAllByType(String type, Pageable pageable){
        Page<Room> allByType = roomRepository.findAllByType(type, pageable);
        return allByType.map(Room::toResponseRoomDto);
    }
}
