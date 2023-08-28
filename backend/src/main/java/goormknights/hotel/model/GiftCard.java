package goormknights.hotel.model;

import goormknights.hotel.dto.request.RequestGiftCardDto;
import goormknights.hotel.dto.response.ResponseGiftCardDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class GiftCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String uuid;
    private int money;//현재 잔액

    @ManyToOne
    private Member member;

    private char isZeroMoney = 'N';//만약 잔액이 0라면 사용불가능하도록 표시하자

    public GiftCard(String uuid, int money) {
        this.uuid = uuid;
        this.money = money;
    }

    @Builder
    public GiftCard(
            int id,
            String uuid,
            int money,
            Member member,
            char isZeroMoney
    ) {
        this.id = id;
        this.uuid = uuid;
        this.money = money;
        this.member = member;
        this.isZeroMoney = isZeroMoney;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    // 사용자가 기프트 카드를 등록한다.
    public void registrationGiftCard(Member member) {
        this.member = member;
        member.getGiftCardList().add(this);
    }

    // 사용자가 기프트 카드를 사용하는 경우
    public void paidByGiftCard(int money) {
        System.out.println("call money : "+money);
        this.money = money;
        if(this.money <= 0)
            isZeroMoney = 'Y';
    }

    public ResponseGiftCardDto toResponseDto() {
        return new ResponseGiftCardDto(this);
    }

    public RequestGiftCardDto toRequestDto() {
        return new RequestGiftCardDto(this);
    }
}
