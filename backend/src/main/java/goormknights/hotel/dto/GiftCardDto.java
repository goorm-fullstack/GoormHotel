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
}
