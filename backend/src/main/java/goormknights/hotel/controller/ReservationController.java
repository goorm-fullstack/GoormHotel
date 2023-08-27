package goormknights.hotel.controller;

import goormknights.hotel.dto.ReservationDto;
import goormknights.hotel.model.Coupon;
import goormknights.hotel.model.GiftCard;
import goormknights.hotel.model.Item;
import goormknights.hotel.model.Reservation;
import goormknights.hotel.repository.coupon.CouponRepository;
import goormknights.hotel.repository.giftcard.GiftCardRepository;
import goormknights.hotel.repository.item.ItemRepository;
import goormknights.hotel.repository.reservation.ReservationRepository;
import goormknights.hotel.service.reservation.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reservation")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository;
    private final ItemRepository itemRepository;
    private final GiftCardRepository giftCardRepository;
    private final CouponRepository couponRepository;

    @PostMapping("/reserve")
    public void createReservation(@RequestParam int memberId, @RequestParam int itemId, @RequestParam int couponId, @RequestParam int giftCardId, @RequestParam int money) {
        ReservationDto reservationDto = ReservationDto.builder()
                .checkIn(LocalDateTime.now())
                .checkOut(LocalDateTime.now())
                .count(1)
                .notice("test")
                .price(10000)
                .stay(2)
                .item((Item) itemRepository.findById(itemId).orElseThrow())
                .build();
        reservationService.paidReservation(memberId, itemId, couponRepository.findById(couponId).orElse(null), giftCardRepository.findById(giftCardId).orElse(null), money, reservationDto);
    }

    @GetMapping("/reserve")
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }
}
