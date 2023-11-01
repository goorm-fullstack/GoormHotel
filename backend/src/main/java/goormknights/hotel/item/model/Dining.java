package goormknights.hotel.item.model;

import goormknights.hotel.item.dto.request.RequestDiningDto;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.response.ResponseDiningDto;
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
@DiscriminatorValue("dining")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder(toBuilder = true)
@OnDelete(action = OnDeleteAction.CASCADE)
public class Dining extends Item {

    @Column
    private String useTime; // 이용 시간(ex. 아침, 점심, 저녁)

    // 엔티티 수정
    public Dining updateDining(RequestDiningDto requestDiningDto, RequestImageDto requestImageDto) {
        return this.toBuilder()
                .priceChildren(requestDiningDto.getPriceChildren())
                .price(requestDiningDto.getPrice())
                .priceAdult(requestDiningDto.getPriceAdult())
                .name(requestDiningDto.getName())
                .type(requestDiningDto.getType())
                .thumbnail(requestImageDto.toEntity())
                .typeDetail(requestDiningDto.getTypeDetail())
                .spare(requestDiningDto.getSpare())
                .spareAdult(requestDiningDto.getSpareAdult())
                .spareChildren(requestDiningDto.getSpareChildren())
                .capacity(requestDiningDto.getCapacity())
                .description(requestDiningDto.getDescription())
                .build();
    }

    // 클라이언트에게 응답 시 ResponseDiningDto로 변경
    public ResponseDiningDto toResponseDiningDto() {
        return ResponseDiningDto.builder()
                .id(this.getId())
                .type(this.getType())
                .price(this.getPrice())
                .name(this.getName())
                .priceAdult(this.getPriceAdult())
                .priceChildren(this.getPriceChildren())
                .typeDetail(this.getTypeDetail())
                .spare(this.getSpare())
                .spareAdult(this.getSpareAdult())
                .spareChildren(this.getSpareChildren())
                .capacity(this.getCapacity())
                .description(this.getDescription())
                .build();
    }
}