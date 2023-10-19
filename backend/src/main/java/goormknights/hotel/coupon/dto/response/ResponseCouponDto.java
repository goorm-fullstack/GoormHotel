package goormknights.hotel.coupon.dto.response;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.member.model.Member;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseCouponDto {
    private Long id;
    private String name;
    private String uuid;
    private int discountRate;
    private Member member;
    private char isUsed;
    private LocalDateTime issueDate;//발행일
    private int expire;//만료일

    public ResponseCouponDto(Coupon coupon) {
        this.uuid = coupon.getUuid();
        this.discountRate = coupon.getDiscountRate();
        this.member = coupon.getMember();
        this.isUsed = coupon.getIsUsed();
        this.issueDate = coupon.getIssueDate();
        this.expire = coupon.getExpire();
        this.name = coupon.getName();
    }

    public Coupon toEntity() {
        return Coupon.builder()
                .id(id)
                .uuid(uuid)
                .discountRate(discountRate)
                .member(member)
                .isUsed(isUsed)
                .issueDate(issueDate)
                .expire(expire)
                .build();
    }
}
