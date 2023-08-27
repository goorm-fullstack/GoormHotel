package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("room")
@SuperBuilder(toBuilder = true)
@OnDelete(action = OnDeleteAction.CASCADE)
public class Room extends Item{

    @Column(nullable = false)
    private String bed; // 침대 타입(ex. 싱글, 더블/트윈, 킹)

    @Column(nullable = false)
    private Integer spare; // 잔여 객실 수

    @Column(nullable = false)
    private Integer roomAdult; // 최대 숙박 가능 인원 수(어른)

    @Column(nullable = false)
    private Integer roomChild; // 최대 숙박 가능 인원 수(어린이)

    @Column(nullable = false)
    private Integer capacity; // 숙박 인원 기준
}
