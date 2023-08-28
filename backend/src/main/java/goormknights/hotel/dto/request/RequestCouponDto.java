package goormknights.hotel.dto.request;

import goormknights.hotel.model.Coupon;
import goormknights.hotel.model.Member;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RequestCouponDto {
    private int id;
    private String uuid;
    private int discountRate;
    private Member member;
    private char isUsed;
    private LocalDateTime issueDate;//발행일
    private int expire;//만료일

    public RequestCouponDto(Coupon coupon) {
        this.id = coupon.getId();
        this.uuid = coupon.getUuid();
        this.discountRate = coupon.getDiscountRate();
        this.member = coupon.getMember();
        this.isUsed = coupon.getIsUsed();
        this.issueDate = coupon.getIssueDate();
        this.expire = coupon.getExpire();
    }

    //상품 가격 계산
    public int calculateDiscountPrice(int price, String type) {
        if(isAvailable() || isUsed=='N') {
            if(type.equals("dining")) {//상품이 다이닝 타입인 경우
                discountRate-= 5;// 다이닝 할인폭은 객실 할인 폭보다 5퍼센터 작다.
            }

            BigDecimal discountPrice = BigDecimal.valueOf(price).multiply(BigDecimal.valueOf(discountRate).divide(BigDecimal.valueOf(100)));
            isUsed = 'Y';
            return discountPrice.intValue();
        }
        return price;
    }

    private boolean isAvailable() {
        LocalDateTime now = LocalDateTime.now();
        if(now.isAfter(issueDate.plusDays(expire))) {//만료일이 지났는지 체크
            isUsed = 'Y';//사용불가 체크
            return false;
        }
        return true;
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
