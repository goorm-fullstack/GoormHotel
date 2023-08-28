package goormknights.hotel.model;

import lombok.*;

import java.util.Date;
import goormknights.hotel.model.Item;
import goormknights.hotel.model.Member;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Reservation {

    private int reservationNumber;      // 예약번호, 날짜+숫자 조합
    private Date checkIn;               // 체크인 날짜
    private Date checkOut;              // 체크아웃 날짜
    private int count;                  // 상품 수량
    private Member member;              // 예약자 정보: 이름, 회원유무, 연락처, 이메일
    private String notice;              // 요청사항
    private Item item;                  // 상품정보: 상품명, 가격, 추가 가능 인원, 추가 비용(어른/어린이)
    private int stay;                   // 총 숙박일 수
    private Coupon coupon;              // 멤버십 쿠폰
    private GiftCard giftCard;          // 상품권

}
