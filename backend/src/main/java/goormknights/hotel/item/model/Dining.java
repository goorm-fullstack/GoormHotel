package goormknights.hotel.item.model;

import goormknights.hotel.item.dto.request.RequestDiningDTO;
import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.dto.response.ResponseDiningDTO;
import jakarta.persistence.*;
import lombok.*;
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

    @Column(nullable = false)
    private String useTime; // 이용 시간(ex. 아침, 점심, 저녁)

    // 엔티티 수정
    public Dining updateDining(RequestDiningDTO requestDiningDTO, RequestImageDto requestImageDTO){
        return this.toBuilder()
                .priceChildren(requestDiningDTO.getPriceChildren())
                .price(requestDiningDTO.getPrice())
                .priceAdult(requestDiningDTO.getPriceAdult())
                .name(requestDiningDTO.getName())
                .type(requestDiningDTO.getType())
                .useTime(requestDiningDTO.getUseTime())
                .thumbnail(requestImageDTO.toEntity())
                .typeDetail(requestDiningDTO.getTypeDetail())
                .spare(requestDiningDTO.getSpare())
                .spareAdult(requestDiningDTO.getSpareAdult())
                .spareChildren(requestDiningDTO.getSpareChildren())
                .build();
    }

    // 클라이언트에게 응답 시 ResponseDiningDTO로 변경
    public ResponseDiningDTO toResponseDiningDTO(){
        return ResponseDiningDTO.builder()
                .thumbnailPath(this.getThumbnail().getFilePath())
                .type(this.getType())
                .useTime(this.getUseTime())
                .price(this.getPrice())
                .name(this.getName())
                .priceAdult(this.getPriceAdult())
                .priceChildren(this.getPriceChildren())
                .typeDetail(this.getTypeDetail())
                .spare(this.getSpare())
                .spareAdult(this.getSpareAdult())
                .spareChildren(this.getSpareChildren())
                .build();
    }
}
