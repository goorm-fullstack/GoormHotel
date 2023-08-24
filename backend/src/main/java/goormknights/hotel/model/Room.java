package goormknights.hotel.model;

import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.request.RequestRoomDTO;
import goormknights.hotel.dto.response.ResponseRoomDTO;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("room")
@SuperBuilder(toBuilder = true)
@OnDelete(action = OnDeleteAction.CASCADE)
public class Room extends Item{

    @Column(nullable = false)
    private String bed; // 침대 타입(ex. 싱글, 더블/트윈, 킹)

    @Column(nullable = false)
    private Integer spare; // 잔여 객실 수

    @Column(nullable = false)
    private Integer roomAdult; // 최대 숙박 가능 인원 수(어른)

    @Column(nullable = false)
    private Integer roomChild; // 최대 숙박 가능 인원 수(어린이)

    @Column(nullable = false)
    private Integer capacity; // 숙박 인원 기준

    public ResponseRoomDTO toResponseRoomDTO(){
        return ResponseRoomDTO.builder()
                .priceAdult(this.getPriceAdult())
                .thumbnailPath(this.getThumbnail().getFilePath())
                .roomChild(this.getRoomChild())
                .roomAdult(this.getRoomAdult())
                .type(this.getType())
                .spare(this.getSpare())
                .name(this.getName())
                .bed(this.getBed())
                .capacity(this.getCapacity())
                .price(this.getPrice())
                .priceChild(this.getPriceChild())
                .typeDetail(this.getTypeDetail())
                .build();
    }

    public Room updateRoom(RequestRoomDTO requestRoomDTO) {
        return this.toBuilder()
                .priceChild(requestRoomDTO.getPriceChild())
                .price(requestRoomDTO.getPrice())
                .priceAdult(requestRoomDTO.getPriceAdult())
                .name(requestRoomDTO.getName())
                .type(requestRoomDTO.getType())
                .thumbnail(this.getThumbnail())
                .typeDetail(requestRoomDTO.getTypeDetail())
                .roomChild(requestRoomDTO.getRoomChild())
                .roomAdult(requestRoomDTO.getRoomAdult())
                .spare(requestRoomDTO.getSpare())
                .bed(requestRoomDTO.getBed())
                .capacity(requestRoomDTO.getCapacity())
                .build();
    }

    public Room updateRoom(RequestRoomDTO requestRoomDTO, RequestImageDTO requestImageDTO) {
        return this.toBuilder()
                .priceChild(requestRoomDTO.getPriceChild())
                .price(requestRoomDTO.getPrice())
                .priceAdult(requestRoomDTO.getPriceAdult())
                .name(requestRoomDTO.getName())
                .type(requestRoomDTO.getType())
                .thumbnail(requestImageDTO.toEntity())
                .typeDetail(requestRoomDTO.getTypeDetail())
                .roomChild(requestRoomDTO.getRoomChild())
                .roomAdult(requestRoomDTO.getRoomAdult())
                .spare(requestRoomDTO.getSpare())
                .bed(requestRoomDTO.getBed())
                .capacity(requestRoomDTO.getCapacity())
                .build();
    }
}
