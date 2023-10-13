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

    @Builder
    public MemberEditDTO(String email, String memberId, String password, String name, String phoneNumber,
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