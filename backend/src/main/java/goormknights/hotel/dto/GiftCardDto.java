package goormknights.hotel.dto;

import goormknights.hotel.model.GiftCard;
import goormknights.hotel.model.Member;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GiftCardDto {
    private String uuid;
    private int money;//현재 잔액

    public GiftCardDto(GiftCard giftcard) {
        this.uuid = giftcard.getUuid();
        this.money = giftcard.getMoney();
    }

    public int useGiftCard(int price, int useMoney) {
        if(money < useMoney) {
            useMoney = money;// 잔액보다 더 높은 금액을 입력하면 현재 잔액만큼만 사용
        }
        if(useMoney > price) {// 가격보다 더 높은 금액을 입력하면 가격만큼만 잔액을 사용
            useMoney = price;
        }
        money = money - useMoney;
        System.out.println(price - useMoney);
        return price - useMoney;
    }
}
