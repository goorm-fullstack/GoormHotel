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

    @Column(name = "email", nullable = false)
    private String email; // 아이디

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "name", nullable = false)
    private String name; // 실명

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "privacy_check", nullable = false)
    private Boolean privacyCheck;

    @Column(name = "grade", nullable = false)
    private String grade;

    @Column(name = "birth", nullable = false)
    private LocalDate birth; // YYYY-MM-DD

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "signupDate", nullable = false)
    private LocalDateTime signupDate; // YYYY-MM-DDTHH:MM:SS


//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
//    private List<Post> posts;

    @Builder
    public Member(String email, String password, String name, String phoneNumber,
                  String address, boolean privacyCheck, String grade, LocalDate birth,
                  String gender, LocalDateTime signupDate) {
        validateEmail(email);
        validateDisplayName(name);

        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.privacyCheck = privacyCheck;
        this.grade = grade;
        this.birth = birth;
        this.gender = gender;
        this.signupDate = LocalDateTime.now();
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
}
