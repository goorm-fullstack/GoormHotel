package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    private String grade;//Bronze, Silver, Gold, VIP
    private String authority;//ROLE_ANONYMOUS, ROLE_MEMBER,ROLE_ADMIN

    @OneToMany(mappedBy = "member")
    private List<Coupon> couponList = new ArrayList<>();

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
}
