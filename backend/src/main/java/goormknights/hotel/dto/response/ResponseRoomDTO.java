package goormknights.hotel.dto.response;

import goormknights.hotel.model.Image;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ResponseRoomDTO {

    private String thumbnailPath; // 썸네일이미지
    private String name; // 상품명
    private Integer price; // 기본 비용
    private Integer priceAdult; // 어른 추가 비용
    private Integer priceChild; // 어린이 추가 비용
    private String type; // 상품 타입(ex. 객실, 다이닝)

    /**
     * 세부 타입
     * 객실: 디럭스, 스위트, 패밀리, 풀 빌라
     * 다이닝: 레스토랑, 룸서비스, 바&라운지(바, 라운지), 베이커리
     */
    private String typeDetail;
    private String bed; // 침대 타입(ex. 싱글, 더블/트윈, 킹)
    private Integer spare; // 잔여 객실 수
    private Integer roomAdult; // 최대 숙박 가능 인원 수(어른)
    private Integer roomChild; // 최대 숙박 가능 인원 수(어린이)
    private Integer capacity; // 숙박 인원 기준

    @Builder
    public ResponseRoomDTO(String thumbnailPath, String name, Integer price, Integer priceAdult, Integer priceChild, String type, String typeDetail, String bed, Integer spare, Integer roomAdult, Integer roomChild, Integer capacity) {
        this.thumbnailPath = thumbnailPath;
        this.name = name;
        this.price = price;
        this.priceAdult = priceAdult;
        this.priceChild = priceChild;
        this.type = type;
        this.typeDetail = typeDetail;
        this.bed = bed;
        this.spare = spare;
        this.roomAdult = roomAdult;
        this.roomChild = roomChild;
        this.capacity = capacity;
    }
}
