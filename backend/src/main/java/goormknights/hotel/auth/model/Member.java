package goormknights.hotel.auth.model;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Getter
//@Table(name = "members")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    // 예약에 넘겨야 하는 정보 : 예약자명, 회원 유형(회원/비회원), 연락처, 이메일

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;             // 아이디(pk)
    private String name;            // 예약자명
    private String authorization;   // 회원 유형 : 관리자(admin), 회원(member), 비회원(user)
    private String phoneNumber;     // 연락처
    private String email;           // 이메일

}
