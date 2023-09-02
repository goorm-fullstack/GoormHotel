package goormknights.hotel.giftcard.dto.request;

import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestGiftCardDto {
    private int id;
    private String uuid;
    private int money;//현재 잔액
    private Member member;
    private char isZeroMoney;

    public RequestGiftCardDto(GiftCard giftcard) {
        this.id = giftcard.getId();
        this.uuid = giftcard.getUuid();
        this.money = giftcard.getMoney();
        this.member = giftcard.getMember();
        this.isZeroMoney = giftcard.getIsZeroMoney();
    }

    public int useGiftCard(int price, int useMoney) {
        if(money < useMoney) {
            useMoney = money;// 잔액보다 더 높은 금액을 입력하면 현재 잔액만큼만 사용
        }
        if(useMoney > price) {// 가격보다 더 높은 금액을 입력하면 가격만큼만 잔액을 사용
            useMoney = price;
        }
        money = money - useMoney;
        isAllUseAmountMoney();

        return price - useMoney;
    }

    // 금액을 다 사용했는지 확인해보자
    private void isAllUseAmountMoney() {
        if(money <= 0) {
            isZeroMoney = 'Y';
        }
    }

    public GiftCard toEntity() {
        return GiftCard.builder()
                .id(id)
                .uuid(uuid)
                .money(money)
                .member(member)
                .isZeroMoney(isZeroMoney)
                .build();
    }
}
