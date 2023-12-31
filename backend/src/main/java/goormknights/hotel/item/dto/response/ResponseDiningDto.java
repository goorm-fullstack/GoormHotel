package goormknights.hotel.item.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ResponseDiningDto {

    private Long id;
    private String name; // 상품명
    private int price; // 기본 비용
    private int priceAdult; // 어른 추가 비용
    private int priceChildren; // 어린이 추가 비용
    private int spare; // 잔여 객실 수
    private int spareAdult; // 최대 숙박 가능 인원 수(어른)
    private int spareChildren; // 최대 숙박 가능 인원 수(어린이)
    private int capacity; // 기준 인원
    private String type; // 상품 타입(ex. 객실, 다이닝)

    /**
     * 세부 타입
     * 객실: 디럭스, 스위트, 패밀리, 풀 빌라
     * 다이닝: 레스토랑, 룸서비스, 바&라운지(바, 라운지), 베이커리
     */
    private String typeDetail;
    private String description;

    @Builder
    public ResponseDiningDto(Long id, String name, int price, int priceAdult, int priceChildren, int spare, int spareAdult, int spareChildren, int capacity, String type, String typeDetail, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.priceAdult = priceAdult;
        this.priceChildren = priceChildren;
        this.spare = spare;
        this.spareAdult = spareAdult;
        this.spareChildren = spareChildren;
        this.capacity = capacity;
        this.type = type;
        this.typeDetail = typeDetail;
        this.description = description;
    }
}