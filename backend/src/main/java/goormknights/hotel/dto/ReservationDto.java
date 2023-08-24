package goormknights.hotel.dto;

import goormknights.hotel.model.GiftCard;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    @Builder
    public ReservationDto(LocalDateTime checkIn, LocalDateTime checkOut, int count, String notice, int price, int stay) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.count= count;
        this.notice = notice;
        this.price = price;
        this.stay = stay;
    }

    public int getTotalPrice_UseCoupon(int discountRate) {
        BigDecimal price = new BigDecimal(getPrice());
        BigDecimal discount = new BigDecimal(discountRate).divide(BigDecimal.valueOf(100));
        price = price.subtract(price.multiply(discount));
        int value = price.setScale(0, RoundingMode.FLOOR).intValue();
        System.out.println(value);
        return value;
    }

    public int getTotalPrice_UseGiftCard(GiftCardDto giftCard) {
        int price = getPrice();
        if(price > giftCard.getMoney()) {
            price -= giftCard.getMoney();
            giftCard.setMoney(0);
        } else {
            price = 0;
            giftCard.setMoney(giftCard.getMoney() - price);
        }
        return price;
    }
}
