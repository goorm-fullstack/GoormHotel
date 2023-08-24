package goormknights.hotel.service;

import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.request.RequestRoomDTO;
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
    private final RoomRepository roomRepository;

    public String saveRoom(RequestRoomDTO requestRoomDTO, RequestImageDTO requestImageDTO){
        Room build = requestRoomDTO.toEntity().toBuilder()
                .thumbnail(requestImageDTO.toEntity())
                .build();
        return itemRepository.save(build).getName();
    }

    public Room modifyRoom(String roomName, RequestRoomDTO requestRoomDTO, @Nullable RequestImageDTO requestImageDTO) {
        Room originRoom = findByRoomName(roomName);

        Room modifiedRoom;
        if(requestImageDTO != null){
            modifiedRoom = itemRepository.save(originRoom.updateRoom(requestRoomDTO, requestImageDTO));
        }else{
            modifiedRoom = itemRepository.save(originRoom.updateRoom(requestRoomDTO));
        }
        return modifiedRoom;
    }

    public void deleteByRoomName(String roomName){
        roomRepository.deleteByName(roomName);
    }

    public Room findByRoomName(String roomName) {
        return roomRepository.findByName(roomName);
    }

    public List<Room> findAllRoom(String type){
        return itemRepository.findAllRoom(type);
    }
}
