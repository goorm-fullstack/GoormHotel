package goormknights.hotel.reservation.model;

import goormknights.hotel.global.event.MemberEventListener;
import goormknights.hotel.global.event.ReservationEventListener;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.reservation.dto.response.ResponseReservationDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(ReservationEventListener.class)//내가 만든 이벤트 리스너와 연결
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                    // 인덱스 번호(PK)

    @Column(nullable = false)
    private String reservationNumber;   // 예약 번호: 날짜 + 랜덤 숫자 조합

    @Column(nullable = false)
    private LocalDateTime orderDate;    // 예약 시점 정보: 예약한 날짜, 시간 정보

    @Column(nullable = false)
    private LocalDateTime checkIn;      // 체크인 날짜

    @Column(nullable = false)
    private LocalDateTime checkOut;     // 체크아웃 날짜

    @Column(nullable = false)
    private Integer count;                  // 상품 수량

    @Column(nullable = false)
    private Integer adult;                  // 어른 수
    private Integer children;               // 어린이 수

    @ManyToOne
    @JoinColumn(nullable = false)
    private Member member;              // 예약자 정보: 예약자명, 회원 유형(회원/비회원), 회원인 경우 ID, 연락처, 이메일
    private String notice;              // 고객 요청사항

    @ManyToOne
    @JoinColumn(nullable = false)
    private Item item;
    // 예약 상품 정보: 상품명, 상품 유형, 상품 분류, 기본가, 추가 가능 어른 수, 추가 가능 어린이 수, 어른 추가 비용, 어린이 추가 비용

    @Column(nullable = false)
    private Integer stay;                   // 총 예약일 수

    @OneToOne
    private Coupon coupon;              // 적용한 쿠폰: 쿠폰명, 쿠폰 번호, 할인율(%), 사용 유무, 발행일, 만료일

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<GiftCard> giftCard;    // 적용한 상품권

    @Column(nullable = false)
    private Integer sumPrice;               // 총액

    @Column(nullable = false)
    private Integer discountPrice;          // 할인액

    @Column(nullable = false)
    private Integer totalPrice;             // 최종 결제 금액(VAT 포함)

    @Column(nullable = false)
    private String state;               // 예약 상태: 예약, 취소

    /**
     * Reservation -> ResponseReservation 변환
     * @return 변환된 결과물
     */
    public ResponseReservationDto toResponseReservationDto(){
        return new ResponseReservationDto(this);
    }

}
