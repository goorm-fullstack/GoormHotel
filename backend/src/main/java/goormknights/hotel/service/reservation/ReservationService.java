package goormknights.hotel.service.reservation;

import goormknights.hotel.dto.GiftCardDto;
import goormknights.hotel.dto.ReservationDto;
import goormknights.hotel.exception.AlreadyUsedException;
import goormknights.hotel.exception.NotExistItemException;
import goormknights.hotel.exception.NotExistMemberException;
import goormknights.hotel.model.*;
import goormknights.hotel.repository.coupon.CouponRepository;
import goormknights.hotel.repository.giftcard.GiftCardRepository;
import goormknights.hotel.repository.item.ItemRepository;
import goormknights.hotel.repository.member.MemberRepository;
import goormknights.hotel.repository.reservation.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final CouponRepository couponRepository;
    private final GiftCardRepository giftCardRepository;

    // 일반적인 예약 상황
    public int createReservation(int memberId, int itemId, ReservationDto reservationDto) {
        Member customer = memberRepository.findById(memberId).orElseThrow(() -> new NotExistMemberException("회원이 아닙니다. 로그인 또는 비회원 주문으로 진행해주세요"));
        Item buyItem = itemRepository.findById(itemId).orElseThrow(() -> new NotExistItemException("주문할 수 없는 상품입니다. 다시 확인해주세요"));

        Reservation reservation = new Reservation(
                reservationDto.getCheckIn(),
                reservationDto.getCheckOut(),
                reservationDto.getCount(),
                reservationDto.getNotice(),
                reservationDto.getPrice(),
                reservationDto.getStay(),
                customer,
                buyItem
        );
        Reservation save = reservationRepository.save(reservation);
        customer.getReservationList().add(save);//연관관계를 걸어주자
        customer.considerGradeLevelUp();
        return save.getId();
    }

    // 만약 쿠폰을 사용해서 예약을 하는 경우
    // TODO 다이닝을 나중에 구별해야 한다.
    public int createReservation(int memberId, int itemId, int couponId, ReservationDto reservationDto) {
        Member customer = memberRepository.findById(memberId).orElseThrow(() -> new NotExistMemberException("회원이 아닙니다. 로그인 또는 비회원 주문으로 진행해주세요"));
        Item buyItem = itemRepository.findById(itemId).orElseThrow(() -> new NotExistItemException("주문할 수 없는 상품입니다. 다시 확인해주세요"));

        Coupon coupon = couponRepository.findById(couponId).orElseThrow(() -> new NoSuchElementException("사용할 수 없습니다"));

        if (coupon.getIsUsed() == 'Y') {
            throw new AlreadyUsedException("이미 사용한 쿠폰입니다. 다시 선택해주세요");
        }
        System.out.println("coupon discount : "+coupon.getDiscountRate());
        Reservation reservation = new Reservation(
                reservationDto.getCheckIn(),
                reservationDto.getCheckOut(),
                reservationDto.getCount(),
                reservationDto.getNotice(),
                reservationDto.getTotalPrice_UseCoupon(coupon.getDiscountRate()),
                reservationDto.getStay(),
                customer,
                buyItem
        );
        Reservation save = reservationRepository.save(reservation);
        customer.getReservationList().add(save);//연관관계를 걸어주자
        customer.considerGradeLevelUp();
        return save.getId();
    }

    // 만약 상품권을 사용하는 경우
    public int createReservation_UseGiftCard(int memberId, int itemId, int giftcardId, ReservationDto reservationDto) {
        Member customer = memberRepository.findById(memberId).orElseThrow(() -> new NotExistMemberException("회원이 아닙니다. 로그인 또는 비회원 주문으로 진행해주세요"));
        Item buyItem = itemRepository.findById(itemId).orElseThrow(() -> new NotExistItemException("주문할 수 없는 상품입니다. 다시 확인해주세요"));

        GiftCard giftcard = giftCardRepository.findById(giftcardId).orElseThrow(()-> new NoSuchElementException("사용할 수 없는 상품권입니다."));

        if(giftcard.getIsZeroMoney()=='Y') {
            throw new AlreadyUsedException("이미 모두 사용한 상품권입니다");
        }

        GiftCardDto giftCardDto = new GiftCardDto(giftcard);
        System.out.println("giftcard Money : "+giftcard.getMoney());
        Reservation reservation = new Reservation(
                reservationDto.getCheckIn(),
                reservationDto.getCheckOut(),
                reservationDto.getCount(),
                reservationDto.getNotice(),
                reservationDto.getTotalPrice_UseGiftCard(giftCardDto),
                reservationDto.getStay(),
                customer,
                buyItem
        );
        Reservation save = reservationRepository.save(reservation);
        customer.getReservationList().add(save);//연관관계를 걸어주자
        customer.considerGradeLevelUp();
        customer.getGiftCardList().add(giftcard);
        giftcard.setMember(customer);
        giftcard.paidByGiftCard(giftCardDto.getMoney());
        return save.getId();
    }
}
