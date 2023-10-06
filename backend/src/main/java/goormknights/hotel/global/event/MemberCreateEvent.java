package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.member.model.Member;
import org.springframework.context.ApplicationEvent;

/**
 * 멤버가 생성될 때 발생하는 이벤트
 */
public class MemberCreateEvent extends ApplicationEvent {
    private final Member member;
    private final Coupon coupon;
    public MemberCreateEvent(MemberEventListener eventListener, Member member, Coupon coupon) {
        super(eventListener);
        this.member = member;
        this.coupon = coupon;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public Member getMember() {
        return member;
    }

}
