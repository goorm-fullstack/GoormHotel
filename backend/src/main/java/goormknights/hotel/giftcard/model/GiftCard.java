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
    private Long id;
    private String uuid;
    private int money;//현재 잔액
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

    @Builder
    public GiftCard(
            Long id,
            String title,
            String uuid,
            int money,
            Reservation reservation,
            char isZeroMoney
    ) {
        this.id = id;
        this.uuid = uuid;
        this.money = money;
        this.reservation = reservation;
        this.isZeroMoney = isZeroMoney;
        this.title = title;
        this.issueDate = LocalDate.now();
        this.expire = 365;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    // 사용자가 기프트 카드를 등록한다.
    public void registrationGiftCard(Reservation reservation) {
        this.reservation = reservation;
        reservation.getGiftCard().add(this);
    }

    // 사용자가 기프트 카드를 사용하는 경우
    public void paidByGiftCard() {
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
