package goormknights.hotel.model;

import goormknights.hotel.dto.CouponDto;
import goormknights.hotel.dto.GiftCardDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private int count;// 수량
    private String notice;// 사용자 요청사항
    private int price;// 상품 총 가격
    private int stay;// 얼마나 머무는지

    @ManyToOne
    private Member member;

    @OneToOne
    private Item item;

    public Reservation(LocalDateTime checkIn, LocalDateTime checkOut, int count, String notice, int price, int stay, Member member, Item item) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.count = count;
        this.notice = notice;
        this.price = price;
        this.stay = stay;
        this.member = member;
        this.item = item;
    }

    public int getTotalPrice_NoCoupon() {
        return price;
    }

    // 상품 가격 계산을 위한 로직
    public int calculateDiscountPrice(CouponDto coupon, GiftCardDto giftCard, int useGiftCardMoney) {
        if(coupon == null && giftCard == null) {//쿠폰, 상품권 사용하지 않음
            return price;
        } else if(coupon == null && giftCard != null) {//쿠폰은 사용하지 않지만, 상품권은 사용
            int resultPrice = giftCard.useGiftCard(price, useGiftCardMoney);
            return resultPrice;
        } else if(coupon != null && giftCard == null) {// 쿠폰은 사용하지만, 상품권은 사용하지 않는다.
            int resultprice = price - coupon.calculateDiscountPrice(price, item.getType());
            return resultprice;
        } else {//쿠폰, 상품권 모두 사용한다.
            int resultPrice = price - (giftCard.useGiftCard(price, useGiftCardMoney) + coupon.calculateDiscountPrice(price, item.getType()));
            return resultPrice;
        }
    }
}
