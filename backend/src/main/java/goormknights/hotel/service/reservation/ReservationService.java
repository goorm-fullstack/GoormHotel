package goormknights.hotel.service.reservation;

import goormknights.hotel.dto.ReservationDto;
import goormknights.hotel.exception.NotExistMemberException;
import goormknights.hotel.model.*;
import goormknights.hotel.repository.item.ItemRepository;
import goormknights.hotel.repository.member.MemberRepository;
import goormknights.hotel.repository.reservation.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
// TODO 쿠폰 + 상품권 로직
// (기본가+추가금액) - 상품권(상품권 금액) - 쿠폰(상품 기본가의 5%)
// 상품권은 예약 건당 여러개 사용 가능하지만 쿠폰은 하나만 적용 가능합니다.
// 상품권과 쿠폰은 동시에 사용할 수 있습니다.
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;

    // TODO 쿠폰, 상품권, 일반 예약 로직을 한번에 처리하자~
    public void paidReservation(int memberId, int itemId, Coupon coupon, GiftCard giftCard, int useGiftCardMoney, ReservationDto reservationDto) {
        Member customer = memberRepository.findById(memberId).orElseThrow(()-> new NotExistMemberException("사용자가 없습니다.")
        );

        Item buyItem = (Item) itemRepository.findById(itemId).orElseThrow();

        if(coupon!=null && giftCard != null) {
            Reservation newReserve = new Reservation(
                    reservationDto.getCheckIn(),
                    reservationDto.getCheckOut(),
                    reservationDto.getCount(),
                    reservationDto.getNotice(),
                    reservationDto.calculateDiscountPrice(coupon.toDto(), giftCard.toDto(), useGiftCardMoney),
                    reservationDto.getStay(),
                    customer,
                    buyItem
            );
            Reservation save = reservationRepository.save(newReserve);
            customer.getReservationList().add(save);
            customer.considerGradeLevelUp();
        } else if(coupon != null && giftCard == null) {
            Reservation newReserve = new Reservation(
                    reservationDto.getCheckIn(),
                    reservationDto.getCheckOut(),
                    reservationDto.getCount(),
                    reservationDto.getNotice(),
                    reservationDto.calculateDiscountPrice(coupon.toDto(), null, 0),
                    reservationDto.getStay(),
                    customer,
                    buyItem
            );
            Reservation save = reservationRepository.save(newReserve);
            customer.getReservationList().add(save);
            customer.considerGradeLevelUp();
        } else if(coupon == null && giftCard != null) {
            Reservation newReserve = new Reservation(
                    reservationDto.getCheckIn(),
                    reservationDto.getCheckOut(),
                    reservationDto.getCount(),
                    reservationDto.getNotice(),
                    reservationDto.calculateDiscountPrice(null, giftCard.toDto(), useGiftCardMoney),
                    reservationDto.getStay(),
                    customer,
                    buyItem
            );
            Reservation save = reservationRepository.save(newReserve);
            customer.getReservationList().add(save);
            customer.considerGradeLevelUp();
        } else {
            Reservation newReserve = new Reservation(
                    reservationDto.getCheckIn(),
                    reservationDto.getCheckOut(),
                    reservationDto.getCount(),
                    reservationDto.getNotice(),
                    reservationDto.calculateDiscountPrice(null, null, 0),
                    reservationDto.getStay(),
                    customer,
                    buyItem
            );
            Reservation save = reservationRepository.save(newReserve);
            customer.getReservationList().add(save);
            customer.considerGradeLevelUp();
        }
    }
}
