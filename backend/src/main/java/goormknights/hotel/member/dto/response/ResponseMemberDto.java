package goormknights.hotel.member.dto.response;

import goormknights.hotel.coupon.dto.response.ResponseCouponDto;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.model.Member;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;


@Data
public class ResponseMemberDto {
    private Long id;
    private String memberId; // 회원 아이디
    private String name; // 실명
    private String phoneNumber;
    private String email;
    private LocalDate signupDate; // YYYY-MM-DDTHH:MM:SS
    private String grade;           // Bronze, Silver, Gold
    private Role role;
    private List<ResponseCouponDto> couponList;

    public ResponseMemberDto(Member member) {
        this.id = member.getId();
        this.memberId = member.getMemberId();
        this.name = member.getName();
        this.phoneNumber = member.getPhoneNumber();
        this.email = member.getEmail();
        this.signupDate = member.getSignupDate();
        this.grade = member.getGrade();
        this.role = member.getRole();
        this.couponList = member.getCouponList().stream().map(ResponseCouponDto::new).toList();
    }
}
