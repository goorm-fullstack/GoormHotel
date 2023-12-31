package goormknights.hotel.global.schedule;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


import java.util.List;

/**
 * 스케쥴러 핸들러
 */
@Component
@RequiredArgsConstructor
public class ScheduleTask {

    private final MemberRepository memberRepository;
    private final CouponRepository couponRepository;

    // 매달 1일에 멤버에게 쿠폰을 발행할 스케쥴러입니다.
    @Scheduled(cron = "0 0 0 1 * ?")
    public void everyMonthFirstDayTask() {
        System.out.println("run schedule");
        List<Member> memberList = memberRepository.findAll();
        // 모든 사용자에게 쿠폰을 추가해준다.
        for(Member member : memberList) {
            Coupon coupon = new Coupon();
            coupon.setMember(member);
            coupon.setDiscountRate();
            coupon.nameStrategy();
            member.getCouponList().add(coupon);
            couponRepository.save(coupon);
        }
    }
}
