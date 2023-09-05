package goormknights.hotel.member.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.global.event.MemberEventListener;
import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(MemberEventListener.class)//내가 만든 이벤트 리스너와 연결
@AllArgsConstructor
@Builder
public class Member {

    // 예약에 넘겨야 하는 정보 : 예약자명, 회원 유형(회원/비회원), 회원인 경우 ID, 연락처, 이메일

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memberId;        // 회원 아이디
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String address;
    private boolean privacyCheck;

    private String grade;           // Bronze, Silver, Gold
    private String auth;            // ROLE_ANONYMOUS, ROLE_MEMBER,ROLE_ADMIN
    // 정확하게 기억나지 않는데 병합 전 authority처럼 전체 단어 사용했다가 예약어랑 겹쳐서 오류 발생
    // -> auth로 변수명 변경하여 해결한 적이 있어 변경해둡니다. - 문소희

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Coupon> couponList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Reservation> reservationList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
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
                  String auth
    ) {
        this.address = address;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.privacyCheck = privacyCheck;
        this.grade = grade;
        this.auth = auth;
    }


    public int getReservationCountByYear() {
        LocalDateTime now = LocalDateTime.now().plusHours(1);
        LocalDateTime before = LocalDateTime.of(now.getYear()-1, now.getMonth(), now.getDayOfMonth(), now.getHour(), now.getMinute());
        int count = 0;
        for(Reservation reservation : reservationList) {
            if(reservation.getOrderDate().isAfter(before) && reservation.getOrderDate().isBefore(now)) {
                count+=1;
            }
        }
        return count;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
