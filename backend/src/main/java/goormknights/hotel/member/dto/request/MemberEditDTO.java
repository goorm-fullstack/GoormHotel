package goormknights.hotel.member.dto.request;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberEditDTO {
    private String name;
    private String email;
    private String memberId;
    private String password;
    private String phoneNumber;
    private LocalDate birth;
    private String gender;
    private String code;
}