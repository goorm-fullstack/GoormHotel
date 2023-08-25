package goormknights.hotel.dto.request;

import goormknights.hotel.model.Dining;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RequestDiningDTO {

    @NotBlank
    private String name; // 상품명

    @Positive
    private Integer price; // 기본 비용

    @Positive
    private Integer priceAdult; // 어른 추가 비용

    @PositiveOrZero
    private Integer priceChild; // 어린이 추가 비용

    @NotBlank
    private String type; // 상품 타입(ex. 객실, 다이닝)

    /**
     * 세부 타입
     * 객실: 디럭스, 스위트, 패밀리, 풀 빌라
     * 다이닝: 레스토랑, 룸서비스, 바&라운지(바, 라운지), 베이커리
     */
    @NotBlank
    private String typeDetail;

    @NotBlank
    private String useTime; // 이용 시간(ex. 아침, 점심, 저녁)

    @Builder(toBuilder = true)
    public RequestDiningDTO(String name, Integer price, Integer priceAdult, Integer priceChild, String type, String typeDetail, String useTime) {
        this.name = name;
        this.price = price;
        this.priceAdult = priceAdult;
        this.priceChild = priceChild;
        this.type = type;
        this.typeDetail = typeDetail;
        this.useTime = useTime;
    }

    // RequestDiningDTO 엔티티화
    public Dining toEntity(){
        return Dining.builder()
                .name(name)
                .price(price)
                .priceAdult(priceAdult)
                .priceChild(priceChild)
                .type(type)
                .useTime(useTime)
                .typeDetail(typeDetail)
                .build();
    }
}
