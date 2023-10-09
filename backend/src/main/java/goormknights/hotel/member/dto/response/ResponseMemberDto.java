package goormknights.hotel.member.dto.response;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.model.Member;
import lombok.Data;

import java.time.LocalDate;


@Data
public class ResponseMemberDto {
    private Long id;
    private String memberId; // 회원 아이디
    private String name; // 실명
    private LocalDate signupDate; // YYYY-MM-DDTHH:MM:SS
    private String grade;           // Bronze, Silver, Gold
    private Role role;

    public ResponseMemberDto(Member member) {
        this.id = member.getId();
        this.memberId = member.getMemberId();
        this.name = member.getName();
        this.signupDate = member.getSignupDate();
        this.grade = member.getGrade();
        this.role = member.getRole();
    }
}
