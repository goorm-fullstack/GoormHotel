package goormknights.hotel.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class MemberEdit {
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
    @NotNull(message = "생일을 입력해주세요")
    private LocalDate birth;
    @NotBlank(message = "성별을 입력해주세요")
    private String gender;

    @Builder
    public MemberEdit(String email, String memberId, String password, String name, String phoneNumber,
                  LocalDate birth, String gender) {
        this.email = email;
        this.memberId = memberId;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birth = birth;
        this.gender = gender;
    }
}
