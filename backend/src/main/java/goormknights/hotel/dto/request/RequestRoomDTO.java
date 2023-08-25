package goormknights.hotel.dto.request;

import goormknights.hotel.model.Room;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class RequestRoomDTO {

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
    private String bed; // 침대 타입(ex. 싱글, 더블/트윈, 킹)

    @PositiveOrZero
    private Integer spare; // 잔여 객실 수

    @Positive
    private Integer roomAdult; // 최대 숙박 가능 인원 수(어른)

    @Positive
    private Integer roomChild; // 최대 숙박 가능 인원 수(어린이)

    @Positive
    private Integer capacity; // 숙박 인원 기준

    @Builder(toBuilder = true)
    public RequestRoomDTO(String name, Integer price, Integer priceAdult, Integer priceChild, String type, String typeDetail, String bed, Integer spare, Integer roomAdult, Integer roomChild, Integer capacity) {
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

    // RequestRoomDTO 엔티티화
    public Room toEntity(){
        return Room.builder()
                .name(name)
                .price(price)
                .priceAdult(priceAdult)
                .priceChild(priceChild)
                .type(type)
                .bed(bed)
                .spare(spare)
                .roomAdult(roomAdult)
                .roomChild(roomChild)
                .capacity(capacity)
                .typeDetail(typeDetail)
                .build();
    }
}
