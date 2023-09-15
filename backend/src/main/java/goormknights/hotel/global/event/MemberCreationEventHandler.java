package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.email.service.EmailService;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.global.entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberCreationEventHandler implements ApplicationListener<MemberCreateEvent> {
    private final CouponRepository couponRepository;
    private final EmailService emailService;

    // 멤버가 저장되는 순간에 이벤트가 발생한다.
    // 멤버가 생성될 때 쿠폰을 생성해서 넣어준다.
    // 멤버가 생성될 때 사용자에게 가입 확인 메일을 보내주는 로직 추가 - @김경규
    @Override
    public void onApplicationEvent(MemberCreateEvent event) {
        Member member = event.getMember();
        Coupon coupon = event.getCoupon();
        if(member.getRole() != Role.GUEST) {
            Coupon saveCoupon = couponRepository.save(coupon);
            coupon.setMember(member);
            coupon.nameStrategy();
            coupon.setDiscountRate();
            member.getCouponList().add(saveCoupon);
        }

        EmailMessage emailMessage = EmailMessage.builder()
                .to(member.getEmail())
                .message("가입을 환영합니다.~")
                .subject("가입 환영 메일")
                .build();
        emailService.sendMail(emailMessage);
    }
}
