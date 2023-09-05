package goormknights.hotel.global.event;

import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.email.model.EmailMessage;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.reservation.model.Reservation;
import jakarta.persistence.PrePersist;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservationEventListener {
    private ApplicationEventPublisher eventPublisher;

    public ReservationEventListener(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    @PrePersist
    public void handleMemberCreation(Reservation reservation) {
        System.out.println("call Reservation handler");
        eventPublisher.publishEvent(new ReservationCreateEvent(this, reservation));
    }
}
