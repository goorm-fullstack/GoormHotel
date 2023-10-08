package goormknights.hotel.giftcard.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import goormknights.hotel.reservation.model.Reservation;
import goormknights.hotel.giftcard.dto.request.RequestGiftCardDto;
import goormknights.hotel.giftcard.dto.response.ResponseGiftCardDto;
import goormknights.hotel.member.model.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class GiftCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String uuid;
    private int money;//현재 잔액
    @ManyToOne
    private Member member;
    private char isZeroMoney = 'N';//만약 잔액이 0라면 사용불가능하도록 표시하자
    private String title;//상품권 이름
    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDate issueDate = LocalDate.now();//발행일
    private int expire = 365;//만료일

    @ManyToOne
    private Reservation reservation;    // 사용된 예약 건

    public GiftCard(String uuid, int money) {
        this.uuid = uuid;
        this.money = money;
        this.title = money+"원 상품권";
    }

    @Override
    public String toString() {
        return "GiftCard{" +
                "id=" + id +
                ", uuid='" + uuid + '\'' +
                ", money=" + money +
                ", member=" + member +
                ", isZeroMoney=" + isZeroMoney +
                ", title='" + title + '\'' +
                ", issueDate=" + issueDate +
                ", expire=" + expire +
                ", reservation=" + reservation +
                '}';
    }

    @Builder
    public GiftCard(
            int id,
            String title,
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
        this.title = title;
        this.issueDate = LocalDate.now();
        this.expire = 365;
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

    public void changeUsableState() {
        isZeroMoney = 'N';
    }

    public void changeUnusableState() {
        isZeroMoney = 'Y';
    }

    public void update(RequestGiftCardDto giftCardDto) {
        this.title = giftCardDto.getTitle();
        this.expire = giftCardDto.getExpire();
        this.isZeroMoney = giftCardDto.getIsZeroMoney();
    }
}
