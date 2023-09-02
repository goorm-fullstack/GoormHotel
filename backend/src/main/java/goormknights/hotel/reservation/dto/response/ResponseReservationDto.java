package goormknights.hotel.reservation.dto.response;

import goormknights.hotel.member.model.Member;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.reservation.model.Reservation;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ResponseReservationDto {

    private long id;                    // 인덱스 번호(PK)
    private String reservationNumber;   // 예약 번호: 날짜 + 랜덤 숫자 조합
    private LocalDateTime orderDate;    // 예약 시점 정보: 예약한 날짜, 시간 정보
    private LocalDateTime checkIn;               // 체크인 날짜
    private LocalDateTime checkOut;              // 체크아웃 날짜
    private int count;                  // 상품 수량
    private int adult;                  // 어른 수
    private int children;               // 어린이 수
    private Member member;              // 예약자 정보: 예약자명, 회원 유형(회원/비회원), 회원인 경우 ID, 연락처, 이메일
    private String notice;              // 고객 요청사항
    private Item item;
    // 예약 상품 정보: 상품명, 상품 유형, 상품 분류, 기본가, 추가 가능 어른 수, 추가 가능 어린이 수, 어른 추가 비용, 어린이 추가 비용
    private int stay;                   // 총 예약일 수
    private Coupon coupon;              // 적용한 쿠폰: 쿠폰명, 쿠폰 번호, 할인율(%), 사용 유무, 발행일, 만료일
    private List<GiftCard> giftCard;    // 적용한 상품권
    private int sumPrice;               // 총액
    private int discountPrice;          // 할인액
    private int totalPrice;             // 최종 결제 금액(VAT 포함)
    private String state;               // 예약 상태: 예약, 취소

    public ResponseReservationDto(Reservation reservation) {
        this.id = reservation.getId();
        this.reservationNumber = reservation.getReservationNumber();
        this.orderDate = reservation.getOrderDate();
        this.checkIn = reservation.getCheckIn();
        this.checkOut = reservation.getCheckOut();
        this.count = reservation.getCount();
        this.adult = reservation.getAdult();
        this.children = reservation.getChildren();
        this.member = reservation.getMember();
        this.notice = reservation.getNotice();
        this.item = reservation.getItem();
        this.stay = reservation.getStay();
        this.coupon = reservation.getCoupon();
        this.giftCard = reservation.getGiftCard();
        this.sumPrice = reservation.getSumPrice();
        this.discountPrice = reservation.getDiscountPrice();
        this.totalPrice = reservation.getTotalPrice();
        this.state = reservation.getState();
    }
}
