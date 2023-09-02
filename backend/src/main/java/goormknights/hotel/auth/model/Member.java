package goormknights.hotel.auth.model;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Getter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member {

    // 예약에 넘겨야 하는 정보 : 예약자명, 회원 유형(회원/비회원), 회원인 경우 ID, 연락처, 이메일

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;             // 아이디(pk)
    private String memberId;        // 회원 아이디
    private String name;            // 예약자명
    private String auth;            // 회원 유형 : 관리자(admin), 회원(member), 비회원(user)
    private String phoneNumber;     // 연락처
    private String email;           // 이메일

}
