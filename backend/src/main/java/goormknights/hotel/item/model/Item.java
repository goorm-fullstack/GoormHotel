package goormknights.hotel.item.model;

import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.awt.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // 상속 관계 매핑 (join)
@DiscriminatorColumn // Dtype
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
//@Where(clause = "DELETED = false")
//@SQLDelete(sql = "UPDATE item SET deleted = true WHERE id = ?")
@AllArgsConstructor
public class Item {

    // 예약에 넘겨야 하는 정보 : 상품명, 상품 유형, 상품 분류, 기본가, 추가 가능 어른 수, 추가 가능 어린이 수, 어른 추가 비용, 어린이 추가 비용

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                // index(pk)

    private String name;            // 상품명
    private int price;              // 기본가
    private int priceAdult;         // 어른 추가 비용
    private int priceChildren;      // 어린이 추가 비용
    private String type;            // 상품 유형
    private String typeDetail;      // 상품 분류
    private int spare;              // 구매 가능 수량
    private int spareAdult;         // 어른 추가 가능 수
    private int spareChildren;      // 어린이 추가 가능 수

}
