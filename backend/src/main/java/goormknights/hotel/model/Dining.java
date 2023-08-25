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

    // 엔티티 수정
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

    // 클라이언트에게 응답 시 ResponseDiningDTO로 변경
    public ResponseDiningDTO toResponseDiningDTO(){
        return ResponseDiningDTO.builder()
                .thumbnailPath(this.getThumbnail().getFilePath())
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
