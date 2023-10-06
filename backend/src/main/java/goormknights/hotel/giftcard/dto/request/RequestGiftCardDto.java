package goormknights.hotel.giftcard.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import goormknights.hotel.coupon.exception.NotAvailableUseCoupon;
import goormknights.hotel.giftcard.exception.NotAvailableException;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestGiftCardDto {
    private int id;
    private String uuid;
    private String title;
    private int money;//현재 잔액
    private Member member;
    private char isZeroMoney;
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate issueDate;//발행일
    private int expire;//만료일

    public RequestGiftCardDto(GiftCard giftcard) {
        this.id = giftcard.getId();
        this.uuid = giftcard.getUuid();
        this.title = giftcard.getTitle();
        this.money = giftcard.getMoney();
        this.member = giftcard.getMember();
        this.isZeroMoney = giftcard.getIsZeroMoney();
        this.issueDate = giftcard.getIssueDate();
        this.expire = giftcard.getExpire();
    }

    /**
     * 상품권의 금액을 지정해서 사용할 수 없다.
     * 따라서 항상 모든 금액을 사용하고 남는 금액은 제거된다.
     */
    public int useGiftCard(int price) {
        if(isAvailable()) {
            if(price > money) {
                int amount = price - money;
                money = 0;
                isZeroMoney = 'Y';
                return amount;
            } else {
                money = 0;
                isZeroMoney = 'Y';
                return 0;
            }
        } else {
            throw new NotAvailableException("사용할 수 없는 상품권입니다.");
        }
    }

    private boolean isAvailable() {
        LocalDate now = LocalDate.now();
        if(now.isAfter(issueDate.plusDays(expire))) {//만료일이 지났는지 체크
            isZeroMoney = 'Y';//사용불가 체크
            return false;
        }
        return true;
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
