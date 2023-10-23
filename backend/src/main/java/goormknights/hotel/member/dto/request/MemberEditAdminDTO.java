package goormknights.hotel.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MemberEditAdminDTO {
    private String name;
    private String email;
    private String memberId;
    private String password;
    private String phoneNumber;
    private LocalDate birth;
    private String gender;
    private String grade;
}
