package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import goormknights.hotel.reservation.model.Reservation;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ReservationCreateEventHandler implements ApplicationListener<ReservationCreateEvent> {
    private final CouponRepository couponRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void onApplicationEvent(ReservationCreateEvent event) {
        Reservation reservation = event.getReservation();
        Member member = reservation.getMember();

        int reservationCountByYear = member.getReservationCountByYear();

        if(reservationCountByYear >= 10 && member.getGrade().equals("Bronze")) {
            member.setGrade("Silver");
            Coupon coupon = new Coupon();
            coupon.setMember(member);
            coupon.setDiscountRate();
            Coupon save = couponRepository.save(coupon);
            member.getCouponList().add(save);
            memberRepository.save(member);
        } else if(reservationCountByYear >= 50 && member.getGrade().equals("Silver")) {
            member.setGrade("Gold");
            Coupon coupon = new Coupon();
            coupon.setMember(member);
            coupon.setDiscountRate();
            Coupon save = couponRepository.save(coupon);
            memberRepository.save(member);
            member.getCouponList().add(save);
        }
    }
}