package goormknights.hotel.dto;

import goormknights.hotel.dto.request.RequestCouponDto;
import goormknights.hotel.dto.request.RequestGiftCardDto;
import goormknights.hotel.model.Item;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ReservationDto {
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private int count;// 수량
    private String notice;// 사용자 요청사항
    private int price;// 상품 총 가격
    private int stay;// 얼마나 머무는지
    private Item item;

    @Builder
    public ReservationDto(LocalDateTime checkIn, LocalDateTime checkOut, int count, String notice, int price, int stay, Item item) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.count= count;
        this.notice = notice;
        this.price = price;
        this.stay = stay;
        this.item = item;
    }

    // 상품 가격 계산을 위한 로직
    public int calculateDiscountPrice(RequestCouponDto coupon, RequestGiftCardDto giftCard, int useGiftCardMoney) {
        if(coupon == null && giftCard == null) {//쿠폰, 상품권 사용하지 않음
            System.out.println("call 1");
            return price;
        } else if(coupon == null && giftCard != null) {//쿠폰은 사용하지 않지만, 상품권은 사용
            int resultPrice = giftCard.useGiftCard(price, useGiftCardMoney);
            System.out.println("call 2");
            System.out.println(resultPrice);
            return resultPrice;
        } else if(coupon != null && giftCard == null) {// 쿠폰은 사용하지만, 상품권은 사용하지 않는다.
            int resultprice = price - coupon.calculateDiscountPrice(price, item.getType());
            System.out.println("call 3");
            System.out.println(resultprice);
            return resultprice;
        } else {//쿠폰, 상품권 모두 사용한다.
            int resultPrice;
            if(giftCard.useGiftCard(price, useGiftCardMoney) - coupon.calculateDiscountPrice(price, item.getType()) <= 0)
                resultPrice = 0;
            else
                resultPrice = giftCard.useGiftCard(price, useGiftCardMoney) - coupon.calculateDiscountPrice(price, item.getType());
            System.out.println("call 4");
            System.out.println(resultPrice);
            return resultPrice;
        }
    }
}
