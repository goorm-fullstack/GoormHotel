package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.member.model.Member;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PrePersist;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventListener {
    private final ApplicationEventPublisher eventPublisher;

    // 멤버가 생성될 때 멤버에 쿠폰을 추가하는 이벤트 로직
    @PrePersist
    public void handleMemberCreation(Member member) {
        System.out.println("call handler");
        Coupon coupon = new Coupon();

        eventPublisher.publishEvent(new MemberCreateEvent(this, member, coupon));
    }
}
