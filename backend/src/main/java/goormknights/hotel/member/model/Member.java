package goormknights.hotel.member.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.global.entity.BaseEntity;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.global.event.MemberEventListener;
import goormknights.hotel.member.exception.InvalidMemberException;
import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter @Setter
@Entity @Table(name = "members")
@EntityListeners(MemberEventListener.class)//내가 만든 이벤트 리스너와 연결
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity implements Serializable {

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
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;
    private LocalDate signupDate = LocalDate.now();

    private String grade;           // Bronze, Silver, Gold
    private String auth;
    private Boolean mailAuth; // 이메일 인증 여부

    private LocalDateTime memberDeleteTime;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Coupon> couponList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    @JsonIgnore
    private List<Reservation> reservationList = new ArrayList<>();

    private String roomId;

    @Builder
    public Member(String email, String memberId, String password, String name, String phoneNumber,
                  boolean privacyCheck, String grade, LocalDate birth,
                  String gender, Boolean mailAuth, Role role, LocalDateTime memberDeleteTime) {
        validateEmail(email);
        validateDisplayName(name);

        this.email = email;
        this.memberId = memberId;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.privacyCheck = privacyCheck;
        this.grade = grade;
        this.birth = birth;
        this.gender = gender;
        this.signupDate = LocalDate.now();
        this.mailAuth = mailAuth;
        this.role = role;
        this.memberDeleteTime = memberDeleteTime;
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

    //    @ManyToOne
//    @JoinColumn(name = "other_column_name")
//    private Member member;

    public void edit(MemberEditor memberEditor) {
        name = memberEditor.getName();
        email = memberEditor.getEmail();
        memberId = memberEditor.getMemberId();
        password = memberEditor.getPassword();
        phoneNumber = memberEditor.getPhoneNumber();
        birth = memberEditor.getBirth();
        gender = memberEditor.getGender();
        grade = memberEditor.getGrade();
    }

    public MemberEditor.MemberEditorBuilder toEditor() {
        return MemberEditor.builder()
                .name(getName())
                .email(getEmail())
                .memberId(getMemberId())
                .password(getPassword())
                .phoneNumber(getPhoneNumber())
                .birth(getBirth())
                .gender(getGender())
                .grade(getGrade());
    }

//    특정 유저의 id 비교, 찾기에 활용
//    public Integer findMemberId(){
//        return this.member.getId();
//    }

    // 비밀번호 변경 로직 (이메일인증)
    public void changePassword(String newPassword) {
        this.password = newPassword;
    }


    public Member update(String name) {
        this.name = name;
        return this;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getUsername() {
        return this.email;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }

}
