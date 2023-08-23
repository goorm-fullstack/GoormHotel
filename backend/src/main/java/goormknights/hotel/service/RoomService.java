package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.request.RequestRoomDTO;
import goormknights.hotel.dto.response.ResponseRoomDTO;
import goormknights.hotel.model.Dining;
import goormknights.hotel.model.Room;
import goormknights.hotel.repository.ItemRepository;
import goormknights.hotel.repository.RoomRepository;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final ItemRepository<Room> itemRepository;

    public Long saveRoom(RequestRoomDTO requestRoomDTO, RequestImageDTO requestImageDTO){
        Room build = requestRoomDTO.toEntity().toBuilder()
                .thumbnail(requestImageDTO.toEntity())
                .build();
        return itemRepository.save(build).getId();
    }

    public Room modifyRoom(Long itemId, RequestRoomDTO requestRoomDTO, @Nullable RequestImageDTO requestImageDTO) throws Throwable {
        Room originRoom = findById(itemId);

        if(requestImageDTO != null){
            return originRoom.updateRoom(requestRoomDTO, requestImageDTO);
        }else{
            return originRoom.updateRoom(requestRoomDTO);
        }
    }

    public void deleteRoom(Long itemId){
        itemRepository.deleteById(itemId);
    }

    public Room findById(Long itemId) throws Throwable {
        return itemRepository.findById(itemId).orElseThrow(() ->
                new Exception("해당 room을 찾을 수 없습니다."));
    }

    public List<Room> findAllDining(){
        return itemRepository.findAll();
    }
}
