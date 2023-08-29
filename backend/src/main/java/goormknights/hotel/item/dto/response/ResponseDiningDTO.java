package goormknights.hotel.item.dto.response;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ResponseDiningDTO {

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
    private String useTime; // 이용 시간(ex. 아침, 점심, 저녁)

    @Builder
    public ResponseDiningDTO(String thumbnailPath, String name, Integer price, Integer priceAdult, Integer priceChild, String type, String typeDetail, String useTime) {
        this.thumbnailPath = thumbnailPath;
        this.name = name;
        this.price = price;
        this.priceAdult = priceAdult;
        this.priceChild = priceChild;
        this.type = type;
        this.typeDetail = typeDetail;
        this.useTime = useTime;
    }
}
