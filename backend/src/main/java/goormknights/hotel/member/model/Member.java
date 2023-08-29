package goormknights.hotel.member.model;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.global.event.EventListener;
import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(EventListener.class)//내가 만든 이벤트 리스너와 연결
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String address;
    private boolean privacyCheck;

    private String grade;//Bronze, Silver, Gold
    private String authority;//ROLE_ANONYMOUS, ROLE_MEMBER,ROLE_ADMIN

    @OneToMany(mappedBy = "member")
    private List<Coupon> couponList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Reservation> reservationList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<GiftCard> giftCardList =  new ArrayList<>();

    @Nullable
    private String gender;
    @Nullable
    private LocalDateTime birth;

    @Builder
    public Member(String email,
                  String password,
                  String name,
                  String phoneNumber,
                  String address,
                  boolean privacyCheck,
                  String grade,
                  String authority
    ) {
        this.address = address;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.privacyCheck = privacyCheck;
        this.grade = grade;
        this.authority = authority;
    }


    public void considerGradeLevelUp() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime before = LocalDateTime.of(now.getYear()-1, now.getMonth(), now.getDayOfMonth(), now.getHour(), now.getMinute());
        int count = 0;
        for(Reservation reservation : reservationList) {
            if(reservation.getCheckIn().isAfter(before) && reservation.getCheckIn().isBefore(now)) {
                count+=1;
            }
        }

        if(count >=  10 && grade.equals("Bronze"))
            grade = "Silver";
        else if(count >= 50 && !grade.equals("Gold"))
            grade = "Gold";
    }
}
