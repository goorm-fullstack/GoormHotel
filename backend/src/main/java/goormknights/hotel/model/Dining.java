package goormknights.hotel.model;

import goormknights.hotel.dto.request.RequestDiningDTO;
import goormknights.hotel.dto.request.RequestImageDTO;
import goormknights.hotel.dto.response.ResponseDiningDTO;
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

    public Dining updateDining(RequestDiningDTO requestDiningDTO){
        return this.toBuilder()
                .priceChild(requestDiningDTO.getPriceChild())
                .price(requestDiningDTO.getPrice())
                .priceAdult(requestDiningDTO.getPriceAdult())
                .name(requestDiningDTO.getName())
                .type(requestDiningDTO.getType())
                .useTime(requestDiningDTO.getUseTime())
                .thumbnail(this.getThumbnail())
                .typeDetail(requestDiningDTO.getTypeDetail())
                .build();
    }

    public Dining updateDining(RequestDiningDTO requestDiningDTO, RequestImageDTO requestImageDTO){
        return this.toBuilder()
                .priceChild(requestDiningDTO.getPriceChild())
                .price(requestDiningDTO.getPrice())
                .priceAdult(requestDiningDTO.getPriceAdult())
                .name(requestDiningDTO.getName())
                .type(requestDiningDTO.getType())
                .useTime(requestDiningDTO.getUseTime())
                .thumbnail(requestImageDTO.toEntity())
                .typeDetail(requestDiningDTO.getTypeDetail())
                .build();
    }

    public ResponseDiningDTO toResponseDiningDTO(){
        return ResponseDiningDTO.builder()
                .thumbnail(this.getThumbnail())
                .type(this.getType())
                .useTime(this.getUseTime())
                .price(this.getPrice())
                .name(this.getName())
                .priceAdult(this.getPriceAdult())
                .priceChild(this.getPriceChild())
                .typeDetail(this.getTypeDetail())
                .build();
    }
}
