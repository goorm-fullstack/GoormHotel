package goormknights.hotel.model;

import goormknights.hotel.exception.InvalidMemberException;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Getter
@Table(name = "members")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-z0-9._-]+@[a-z]+[.]+[a-z]{2,3}$");
    private static final int MAX_DISPLAY_NAME_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // PK값

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String memberId; // 아이디

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name; // 실명

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private Boolean privacyCheck;

    @Column(nullable = false)
    private String grade;

    @Column(nullable = false)
    private LocalDate birth; // YYYY-MM-DD

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private LocalDateTime signupDate; // YYYY-MM-DDTHH:MM:SS

    @Column(nullable = false)
    private Boolean mailAuth;

//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
//    private List<Post> posts;

    @Builder
    public Member(String email, String memberId, String password, String name, String phoneNumber,
                  boolean privacyCheck, String grade, LocalDate birth,
                  String gender, LocalDateTime signupDate, Boolean mailAuth) {
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
        this.signupDate = LocalDateTime.now();
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
    }

    public MemberEditor.MemberEditorBuilder toEditor() {
        return MemberEditor.builder()
                .name(getName())
                .email(getEmail())
                .memberId(getMemberId())
                .password(getPassword())
                .phoneNumber(getPhoneNumber())
                .birth(getBirth())
                .gender(getGender());
    }

//    특정 유저의 id 비교, 찾기에 활용
//    public Integer findMemberId(){
//        return this.member.getId();
//    }

    // 비밀번호 변경 로직 (이메일인증)
    public void changePassword(String newPassword) {
        this.password = newPassword;
    }

}
