package goormknights.hotel.item.model;

import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.request.RequestRoomDto;
import goormknights.hotel.item.dto.response.ResponseRoomDto;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
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

    // 클라이언트에게 응답 시 ResponseRoomDto로 변경
    public ResponseRoomDto toResponseRoomDto(){
        return ResponseRoomDto.builder()
                .priceAdult(this.getPriceAdult())
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
    public Room updateRoom(RequestRoomDto requestRoomDto, RequestImageDto requestImageDto) {
        return this.toBuilder()
                .priceChildren(requestRoomDto.getPriceChildren())
                .price(requestRoomDto.getPrice())
                .priceAdult(requestRoomDto.getPriceAdult())
                .name(requestRoomDto.getName())
                .type(requestRoomDto.getType())
                .thumbnail(requestImageDto.toEntity())
                .typeDetail(requestRoomDto.getTypeDetail())
                .spareChildren(requestRoomDto.getSpareChildren())
                .spareAdult(requestRoomDto.getSpareAdult())
                .spare(requestRoomDto.getSpare())
                .bed(requestRoomDto.getBed())
                .capacity(requestRoomDto.getCapacity())
                .build();
    }
}