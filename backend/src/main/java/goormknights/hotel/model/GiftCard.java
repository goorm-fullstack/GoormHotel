package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class GiftCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    String uuid;
    int money;//현재 잔액

    @ManyToOne
    private Member member;

    private char isZeroMoney = 'N';//만약 잔액이 0라면 사용불가능하도록 표시하자

    public GiftCard(String uuid, int money) {
        this.uuid = uuid;
        this.money = money;
    }

    // 사용자가 기프트 카드를 등록한다.
    public void registrationGiftCard(Member member) {
        this.member = member;
        member.getGiftCardList().add(this);
    }

    // 사용자가 기프트 카드를 사용하는 경우
    public int paidByGiftCard(int money) {
        if(money - this.money > 0) {
            this.money = 0;
            isZeroMoney = 'Y';
            return money - this.money;
        }else {
            this.money =- money;
            return 0;
        }
    }
}
