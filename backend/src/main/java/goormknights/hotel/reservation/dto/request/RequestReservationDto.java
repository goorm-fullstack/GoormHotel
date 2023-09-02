package goormknights.hotel.reservation.dto.request;

import goormknights.hotel.member.model.Member;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RequestReservationDto {

    private long id;                    // 인덱스 번호(PK)

    @NotBlank
    private String reservationNumber;   // 예약 번호: 날짜 + 랜덤 숫자 조합

    @FutureOrPresent
    private LocalDateTime orderDate = LocalDateTime.now();    // 예약 시점(현재) 정보: 예약한 날짜, 시간 정보

    @Future
    private LocalDateTime checkIn;               // 체크인 날짜: user 입력 사항

    @Future
    private LocalDateTime checkOut;              // 체크아웃 날짜: user 입력 사항

    @Positive
    @Max(10)
    private int count;                  // 상품 수량: user 입력 사항

    @Positive
    @Max(10)
    private int adult;                  // 어른 수: user 입력 사항

    @PositiveOrZero
    @Max(10)
    private int children;               // 어린이 수: user 입력 사항

    @ManyToOne
    private Member member;              // 예약자 정보: user 입력 사항(예약자명, 회원 유형(회원/비회원), 회원인 경우 ID, 연락처, 이메일)
    private String notice;              // 고객 요청사항: user 입력 사항

    @OneToOne
    private Item item;
    // 예약 상품 정보: 상품명, 상품 유형, 상품 분류, 기본가, 추가 가능 어른 수, 추가 가능 어린이 수, 어른 추가 비용, 어린이 추가 비용

    @Positive
    private int stay;                   // 총 예약일 수

    @OneToOne
    private Coupon coupon;              // 적용한 쿠폰: user 입력 사항(쿠폰명, 쿠폰 번호, 할인율(%), 사용 유무, 발행일, 만료일)

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<GiftCard> giftCard;    // 적용한 상품권: user 입력 사항

    @Positive
    private int sumPrice;               // 총액

    @NegativeOrZero
    private int discountPrice;          // 할인액

    @PositiveOrZero
    private int totalPrice;             // 최종 결제 금액(VAT 포함)

    @NotBlank
    private String state = "예약";               // 예약 상태: 예약(기본값), 취소

    public Reservation toEntity() {
        return Reservation.builder()
                .id(id)
                .reservationNumber(reservationNumber)
                .orderDate(orderDate)
                .checkIn(checkIn)
                .checkOut(checkOut)
                .count(count)
                .adult(adult)
                .children(children)
                .member(member)
                .notice(notice)
                .item(item)
                .stay(stay)
                .coupon(coupon)
                .giftCard(giftCard)
                .sumPrice(sumPrice)
                .discountPrice(discountPrice)
                .totalPrice(totalPrice)
                .state(state)
                .build();
    }

}
