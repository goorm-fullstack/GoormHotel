package goormknights.hotel.reservation.model;

import goormknights.hotel.item.model.Item;
import goormknights.hotel.member.model.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private int count;// 수량
    private String notice;// 사용자 요청사항
    private int price;// 상품 총 가격
    private int stay;// 얼마나 머무는지

    @ManyToOne
    private Member member;

    @OneToOne
    private Item item;

    public Reservation(LocalDateTime checkIn, LocalDateTime checkOut, int count, String notice, int price, int stay, Member member, Item item) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.count = count;
        this.notice = notice;
        this.price = price;
        this.stay = stay;
        this.member = member;
        this.item = item;
    }

    public int getTotalPrice_NoCoupon() {
        return price;
    }
}
