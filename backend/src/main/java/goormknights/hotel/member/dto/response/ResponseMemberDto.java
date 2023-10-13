package goormknights.hotel.member.dto.response;

import goormknights.hotel.coupon.dto.response.ResponseCouponDto;
import goormknights.hotel.giftcard.dto.response.ResponseGiftCardDto;
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
    private LocalDate signupDate; // YYYY-MM-DDTHH:MM:SS
    private String grade;           // Bronze, Silver, Gold
    private Role role;
    private List<ResponseCouponDto> couponList;
    private List<ResponseGiftCardDto> giftCardList;

    public ResponseMemberDto(Member member) {
        this.id = member.getId();
        this.memberId = member.getMemberId();
        this.name = member.getName();
        this.signupDate = member.getSignupDate();
        this.grade = member.getGrade();
        this.role = member.getRole();
        this.couponList = member.getCouponList().stream().map(ResponseCouponDto::new).toList();
        this.giftCardList = member.getGiftCardList().stream().map(ResponseGiftCardDto::new).toList();
    }
}
