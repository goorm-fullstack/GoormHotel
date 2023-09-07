package goormknights.hotel.member.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.global.entity.BaseEntity;
import goormknights.hotel.global.event.MemberEventListener;
import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.lang.Nullable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(MemberEventListener.class)//내가 만든 이벤트 리스너와 연결
@Builder
public class Member extends BaseEntity {

    // 예약에 넘겨야 하는 정보 : 예약자명, 회원 유형(회원/비회원), 회원인 경우 ID, 연락처, 이메일

    // 이메일 패턴 제한 필드
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$");
    private static final int MAX_DISPLAY_NAME_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String memberId; // 회원 아이디
    private String email;
    private String password;
    private String name; // 실명
    private String phoneNumber;
    private Boolean privacyCheck;

    private String gender;
    private LocalDate birth; // YYYY-MM-DD
    private LocalDateTime signupDate; // YYYY-MM-DDTHH:MM:SS

    private String grade;           // Bronze, Silver, Gold
    private String auth;            // ROLE_ANONYMOUS, ROLE_MEMBER,ROLE_ADMIN
    private Boolean mailAuth; // 이메일 인증 여부
    // 정확하게 기억나지 않는데 병합 전 authority처럼 전체 단어 사용했다가 예약어랑 겹쳐서 오류 발생
    // -> auth로 변수명 변경하여 해결한 적이 있어 변경해둡니다. - 문소희

    @ManyToOne
    private Role role;

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Coupon> couponList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Reservation> reservationList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<GiftCard> giftCardList =  new ArrayList<>();

    @Builder
    public Member(String email,
                  String memberId,
                  String password,
                  String name,
                  String phoneNumber,
                  Boolean privacyCheck,
                  String grade,
                  LocalDate birth,
                  String gender,
                  LocalDateTime signupDate,
                  Boolean mailAuth,
                  String auth
    ) {
        this.memberId = memberId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.privacyCheck = privacyCheck;
        this.grade = grade;
        this.auth = auth;
        this.birth = birth;
        this.gender = gender;
        this.signupDate = signupDate;
        this.mailAuth = mailAuth;
    }

    private void validateEmail(final String email) {
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        if (!matcher.matches()) {
            throw new InvalidMemberException("이메일 형식이 올바르지 않습니다.");
        }
    }

    private void validateDisplayName(final String displayName) {
        if (displayName.isEmpty() || displayName.length() > MAX_DISPLAY_NAME_LENGTH) {
            throw new InvalidMemberException(String.format("이름은 비어있지 않아야 하고, %d자 이하여야 합니다.", MAX_DISPLAY_NAME_LENGTH));
        }
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
