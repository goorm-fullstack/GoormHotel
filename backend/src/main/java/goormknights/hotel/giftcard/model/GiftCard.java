package goormknights.hotel.giftcard.model;

import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class GiftCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String cardName;            // 상품권명
    private String uuid;                // 상품권 번호
    private int price;                  // 상품권 금액
    private int usePrice;
    private char isUsed = 'N';          // 상품권 사용 유무, Y == 사용, N == 미사용

    @ManyToOne
    private Reservation reservation;    // 사용된 예약 건

}
