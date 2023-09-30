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
import java.util.List;

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
        if(img != null) {
            requestImageDto = imageService.convertToImageDto(img);
        } else {
            requestImageDto = RequestImageDto.builder()
                    .originFileName(originRoom.getThumbnail().getOriginFileName())
                    .fileName(originRoom.getThumbnail().getFileName())
                    .filePath(originRoom.getThumbnail().getFilePath())
                    .mimeType(originRoom.getThumbnail().getMimeType())
                    .data(originRoom.getThumbnail().getData())
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
     * @param pageable - 페이징
     * @return 페이징 처리된 전체 객실 목록
     */
    public Page<Room> findAll(Pageable pageable){
        return roomRepository.findAll(pageable);
    }

    /**
     * 객실 전체 조회
     * @return 전체 객실 조회
     */
    public List<ResponseRoomDto> findAllWithoutPage(){
        List<Room> all = roomRepository.findAll();
        return all.stream().map(Room::toResponseRoomDto).toList();
    }

    /**
     * 페이징된 객실 엔티티 리스트를 Dto로 변환
     * @param roomPage - 페이징된 엔티티 리스트
     * @return Dto로 바꾼다
     */
    public List<ResponseRoomDto> toResponseDtoList(Page<Room> roomPage){
        return roomPage.map(Room::toResponseRoomDto).getContent();
    }

    /**
     * 상품 이름 중복 체크
     * @param roomName - 객실 상품 이름
     * @return 중복일시 true, 아닐시 false
     */
    public boolean existsByName(String roomName){
        return roomRepository.existsByName(roomName);
    }
}
