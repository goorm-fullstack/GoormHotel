package goormknights.hotel.giftcard.dto.response;

import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 상품권 응답용 엔티티
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseGiftCardDto {
    private int id;
    private String uuid;
    private int money;//현재 잔액
    private Member member;
    private char isZeroMoney;

    public ResponseGiftCardDto(GiftCard giftcard) {
        this.id = giftcard.getId();
        this.uuid = giftcard.getUuid();
        this.money = giftcard.getMoney();
        this.member = giftcard.getMember();
        this.isZeroMoney = giftcard.getIsZeroMoney();
    }
}
