package goormknights.hotel.coupon.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String couponName;          // 쿠폰명
    private String uuid;                // 쿠폰 번호
    private int discountRate;           // 할인율(%)
    private char isUsed = 'N';          // 사용 유무, Y == 사용, N == 미사용
    private LocalDateTime issueDate;    // 발행일
    private int expire;                 // 만료일

}
