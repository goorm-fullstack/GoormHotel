package goormknights.hotel.reservation.model;

import goormknights.hotel.auth.model.Member;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Reservation {

    private String reservationNumber;   // 예약 번호: 날짜 + 랜덤 숫자 조합
    private Date checkIn;               // 체크인 날짜
    private Date checkOut;              // 체크아웃 날짜
    private int count;                  // 상품 수량
    private Member member;              // 예약자 정보: 예약자명, 회원 유형(회원/비회원), 연락처, 이메일
    private String notice;              // 고객 요청사항
    private Item item;                  // 예약 상품 정보: 상품명, 기본가, 추가 가능 인원, 추가 비용
    private int stay;                   // 총 예약일 수
    private Coupon coupon;              // 적용한 쿠폰
    private GiftCard giftCard;          // 적용한 상품권

}
