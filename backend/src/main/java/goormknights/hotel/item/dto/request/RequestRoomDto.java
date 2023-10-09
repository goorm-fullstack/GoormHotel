package goormknights.hotel.item.dto.request;

import goormknights.hotel.item.model.Room;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RequestRoomDto {

    @NotBlank
    @Size(min = 1, max = 13, message = "상품명은 13자 이하이어야 합니다.")
    private String name; // 상품명

    @Positive
    private Integer price; // 기본 비용

    @Positive
    private int priceAdult; // 성인 추가 비용

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
    private String bed; // 침대 타입(ex. 싱글, 더블/트윈, 킹)

    @PositiveOrZero
    private int spare; // 잔여 객실 수

    @Positive
    private int spareAdult; // 최대 숙박 가능 인원 수(성인)

    @Positive
    private int spareChildren; // 최대 숙박 가능 인원 수(어린이)

    @Positive
    private int capacity; // 숙박 인원 기준

    @NotBlank
    private String description;

    @Builder(toBuilder = true)
    public RequestRoomDto(String name, int price, int priceAdult, int priceChildren, String type, String typeDetail, String bed, int spare, int spareAdult, int spareChildren, int capacity, String description) {
        this.name = name;
        this.price = price;
        this.priceAdult = priceAdult;
        this.priceChildren = priceChildren;
        this.type = type;
        this.typeDetail = typeDetail;
        this.bed = bed;
        this.spare = spare;
        this.spareAdult = spareAdult;
        this.spareChildren = spareChildren;
        this.capacity = capacity;
        this.description = description;
    }

    // RequestRoomDto 엔티티화
    public Room toEntity(){
        return Room.builder()
                .name(name)
                .price(price)
                .priceAdult(priceAdult)
                .priceChildren(priceChildren)
                .type(type)
                .bed(bed)
                .spare(spare)
                .spareAdult(spareAdult)
                .spareChildren(spareChildren)
                .capacity(capacity)
                .typeDetail(typeDetail)
                .description(description)
                .build();
    }
}