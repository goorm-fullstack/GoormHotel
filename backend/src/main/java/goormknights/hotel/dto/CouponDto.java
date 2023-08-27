package goormknights.hotel.dto;

import goormknights.hotel.model.Coupon;
import goormknights.hotel.model.Member;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CouponDto {
    private String uuid;
    private int discountRate;
    private Member member;
    private char isUsed;
    private LocalDateTime issueDate;//발행일
    private int expire;//만료일

    public CouponDto(Coupon coupon) {
        this.uuid = coupon.getUuid();
        this.discountRate = coupon.getDiscountRate();
        this.member = coupon.getMember();
        this.isUsed = coupon.getIsUsed();
        this.issueDate = coupon.getIssueDate();
        this.expire = coupon.getExpire();
    }

    //상품 가격 계산
    public int calculateDiscountPrice(int price, String type) {
        if(type.equals("dining")) {//상품이 다이닝 타입인 경우
            discountRate-= 5;// 다이닝 할인폭은 객실 할인 폭보다 5퍼센터 작다.
        }

        BigDecimal discountPrice = BigDecimal.valueOf(price).multiply(BigDecimal.valueOf(discountRate).divide(BigDecimal.valueOf(100)));
        System.out.println(discountPrice);
        return discountPrice.intValue();
    }

    private void isAvailable() {
        LocalDateTime now = LocalDateTime.now();
        if(now.isAfter(issueDate.plusDays(expire))) {//만료일이 지났는지 체크
            isUsed = 'Y';//사용불가 체크
        }
    }
}
