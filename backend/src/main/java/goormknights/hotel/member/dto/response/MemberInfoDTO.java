package goormknights.hotel.member.dto.response;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MemberInfoDTO {
    @NotBlank(message = "이름을 입력해주세요")
    private String name;
    @NotBlank(message = "이메일을 입력해주세요")
    private String email;
    @NotBlank(message = "아이디를 입력해주세요")
    private String memberId;
    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;
    @NotBlank(message = "휴대폰 번호를 입력해주세요")
    private String phoneNumber;
    private LocalDate birth;
    private String gender;
}
