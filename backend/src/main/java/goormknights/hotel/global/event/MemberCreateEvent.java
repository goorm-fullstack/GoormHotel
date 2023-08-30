package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.member.model.Member;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

public class MemberCreateEvent extends ApplicationEvent {
    private final Member member;
    private final Coupon coupon;
    public MemberCreateEvent(EventListener eventListener, Member member, Coupon coupon) {
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
