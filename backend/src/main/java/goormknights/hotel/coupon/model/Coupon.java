package goormknights.hotel.coupon.model;

import goormknights.hotel.coupon.dto.request.RequestCouponDto;
import goormknights.hotel.coupon.dto.response.ResponseCouponDto;
import goormknights.hotel.coupon.exception.AlreadyUsedException;
import goormknights.hotel.member.model.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String uuid;
    private int discountRate;

    @ManyToOne
    private Member member;

    private char isUsed = 'N';// Y이면 사용한 쿠폰, N이면 사용하지 않은 쿠폰

    private LocalDateTime issueDate;//발행일
    private int expire;//만료일

    // 아마 사용하지는 않을 것 같은 생성자
    public Coupon() {
        this.uuid = UUID.randomUUID().toString();
        this.discountRate = 5;
        this.issueDate = LocalDateTime.now();
        this.expire = 30;//30일의 유효기간
    }

    @Builder
    public Coupon(
            int id, String uuid,
            int discountRate,
            Member member,
            char isUsed,
            LocalDateTime issueDate,
            int expire
    ) {
        this.id = id;
        this.uuid = uuid;
        this.discountRate = discountRate;
        this.member = member;
        this.isUsed = isUsed;
        this.issueDate = issueDate;
        this.expire = expire;
    }

    // 만약 사용자가 쿠폰을 등록하는 경우나
    // 사용자에게 쿠폰이 주어지는 경우 사용될 예정입니다
    public Coupon(String uuid, Member member) {
        this.uuid = uuid;
        String grade = member.getGrade();
        setDiscountRate();
        this.member = member;
        member.getCouponList().add(this);
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setDiscountRate() {
        switch (member.getGrade()) {
            case "Bronze":
                this.discountRate = 5;
                break;
            case "Silver":
                this.discountRate = 10;
                break;
            case "Gold":
                this.discountRate = 15;
                break;
            default:
                this.discountRate = 0;
        }
    }

    public void setIsUsed() {
        if(this.isUsed=='N') {
            this.isUsed = 'Y';
        } else {
            throw new AlreadyUsedException("이미 사용한 쿠폰입니다.");
        }
    }

    public RequestCouponDto toRequestDto() {
        return new RequestCouponDto(this);
    }

    public ResponseCouponDto toResponseDto() {
        return new ResponseCouponDto(this);
    }
}
