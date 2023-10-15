package goormknights.hotel.member.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class MemberInfoDetailDTO {
    private String name;
    private String grade;
    private String password;
    private String email;
    private String phoneNumber;
    private LocalDate birth;
    private String gender;
    private Boolean mailAuth;
    private LocalDate signupDate;
}
