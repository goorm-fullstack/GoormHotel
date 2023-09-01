package goormknights.hotel.item.dto.request;

import goormknights.hotel.item.model.Dining;
import jakarta.validation.constraints.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RequestDiningDto {

    @NotBlank
    private String name; // 상품명

    @Positive
    private int price; // 기본 비용

    @Positive
    private int priceAdult; // 어른 추가 비용

    @PositiveOrZero
    private int priceChildren; // 어린이 추가 비용

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

    @PositiveOrZero
    private int spare; // 잔여 객실 수

    @PositiveOrZero
    private int spareAdult; // 최대 숙박 가능 인원 수(어른)

    @PositiveOrZero
    private int spareChildren; // 최대 숙박 가능 인원 수(어린이)

    @Builder(toBuilder = true)
    public RequestDiningDto(String name, int price, int priceAdult, int priceChildren, String type, String typeDetail, String useTime, int spare, int spareAdult, int spareChildren) {
        this.name = name;
        this.price = price;
        this.priceAdult = priceAdult;
        this.priceChildren = priceChildren;
        this.type = type;
        this.typeDetail = typeDetail;
        this.useTime = useTime;
        this.spare = spare;
        this.spareAdult = spareAdult;
        this.spareChildren = spareChildren;
    }


    // RequestDiningDTO 엔티티화
    public Dining toEntity(){
        return Dining.builder()
                .name(name)
                .price(price)
                .priceAdult(priceAdult)
                .priceChildren(priceChildren)
                .type(type)
                .useTime(useTime)
                .typeDetail(typeDetail)
                .spare(spare)
                .spareAdult(spareAdult)
                .spareChildren(spareChildren)
                .build();
    }
}