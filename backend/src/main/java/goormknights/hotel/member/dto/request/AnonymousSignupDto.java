package goormknights.hotel.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnonymousSignupDto {
    private String name;
    private String email;
    private String phoneNumber;
    private String gender;
    private LocalDate birth; // YYYY-MM-DD
    private String code; // 이메일 인증 여부
}
