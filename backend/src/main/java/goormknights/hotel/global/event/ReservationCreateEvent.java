package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.reservation.model.Reservation;
import org.springframework.context.ApplicationEvent;

import java.time.Clock;

/**
 * 예약 생성시 발생하는 이벤트
 */
public class ReservationCreateEvent extends ApplicationEvent {
    private final Reservation reservation;

    public ReservationCreateEvent(ReservationEventListener eventListener, Reservation reservation) {
        super(eventListener);
        this.reservation = reservation;
    }

    public Reservation getReservation() {
        return reservation;
    }
}
