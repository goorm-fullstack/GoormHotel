package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.member.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCreationEventHandler implements ApplicationListener<MemberCreateEvent> {
    private final CouponRepository couponRepository;

    // 멤버가 저장되는 순간에 이벤트가 발생한다.
    // 멤버가 생성될 때 쿠폰을 생성해서 넣어준다.
    @Override
    public void onApplicationEvent(MemberCreateEvent event) {
        Member member = event.getMember();
        Coupon coupon = event.getCoupon();

        Coupon saveCoupon = couponRepository.save(coupon);
        member.getCouponList().add(saveCoupon);
        coupon.setMember(member);
        coupon.setDiscountRate();
    }
}
