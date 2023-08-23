package goormknights.hotel.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Table(name = "members")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // PK값

    private String email; // 아이디
    private String password;
    private String name;
    private String phoneNumber;
    private String address;

    private boolean privacyCheck;
    private String grade;
    private LocalDate birth; // YYYY-MM-DD
    private String gender;
    private LocalDateTime signupDate; // YYYY-MM-DDTHH:MM:SS


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Post> posts;

    @Builder
    public Member(String email, String password, String name, String phoneNumber,
                  String address, boolean privacyCheck, String grade, LocalDate birth,
                  String gender, LocalDateTime signupDate) {
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
}
