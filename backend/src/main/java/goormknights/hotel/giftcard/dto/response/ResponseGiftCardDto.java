package goormknights.hotel.giftcard.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 상품권 응답용 엔티티
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseGiftCardDto {
    private int id;
    private String uuid;
    private String title;//상품권 이름
    private int money;//현재 잔액
    private Member member;
    private char isZeroMoney;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate issueDate;//발행일
    private int expire;//만료일

    public ResponseGiftCardDto(GiftCard giftcard) {
        this.id = giftcard.getId();
        this.uuid = giftcard.getUuid();
        this.money = giftcard.getMoney();
        this.member = giftcard.getMember();
        this.isZeroMoney = giftcard.getIsZeroMoney();
        this.title = giftcard.getTitle();
        this.issueDate = giftcard.getIssueDate();
        this.expire = giftcard.getExpire();
    }
}
