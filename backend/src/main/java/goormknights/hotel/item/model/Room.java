package goormknights.hotel.item.model;

import goormknights.hotel.item.dto.request.RequestImageDTO;
import goormknights.hotel.item.dto.request.RequestRoomDTO;
import goormknights.hotel.item.dto.response.ResponseRoomDTO;
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
    private int capacity; // 숙박 인원 기준

    // 클라이언트에게 응답 시 ResponseRoomDTO로 변경
    public ResponseRoomDTO toResponseRoomDTO(){
        return ResponseRoomDTO.builder()
                .priceAdult(this.getPriceAdult())
                .thumbnailPath(this.getThumbnail().getFilePath())
                .spareChildren(this.getSpareChildren())
                .spareAdult(this.getSpareAdult())
                .type(this.getType())
                .spare(this.getSpare())
                .name(this.getName())
                .bed(this.getBed())
                .capacity(this.getCapacity())
                .price(this.getPrice())
                .priceChildren(this.getPriceChildren())
                .typeDetail(this.getTypeDetail())
                .build();
    }

    // 엔티티 수정
    public Room updateRoom(RequestRoomDTO requestRoomDTO, RequestImageDTO requestImageDTO) {
        return this.toBuilder()
                .priceChildren(requestRoomDTO.getPriceChildren())
                .price(requestRoomDTO.getPrice())
                .priceAdult(requestRoomDTO.getPriceAdult())
                .name(requestRoomDTO.getName())
                .type(requestRoomDTO.getType())
                .thumbnail(requestImageDTO.toEntity())
                .typeDetail(requestRoomDTO.getTypeDetail())
                .spareChildren(requestRoomDTO.getSpareChildren())
                .spareAdult(requestRoomDTO.getSpareAdult())
                .spare(requestRoomDTO.getSpare())
                .bed(requestRoomDTO.getBed())
                .capacity(requestRoomDTO.getCapacity())
                .build();
    }
}
