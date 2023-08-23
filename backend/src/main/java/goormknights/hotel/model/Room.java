package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("room")
public class Room extends Item{

    @Column(nullable = false)
    private String bedType; // 침대 타입

    @Column(nullable = false)
    private Integer spare; // 잔여 객실 수

    @Column(nullable = false)
    private Integer roomAdult; // 성인 수

    @Column(nullable = false)
    private Integer roomChild; // 어린이 수

    @Column(nullable = false)
    private Integer capacity; // 수용 가능 인원 수

    @Builder
    public Room(Image image, String name, Integer price, Integer priceAdult, Integer priceChild, String type, String bedType, Integer spare, Integer roomAdult, Integer roomChild, Integer capacity) {
        super(image, name, price, priceAdult, priceChild, type);
        this.bedType = bedType;
        this.spare = spare;
        this.roomAdult = roomAdult;
        this.roomChild = roomChild;
        this.capacity = capacity;
    }
}
