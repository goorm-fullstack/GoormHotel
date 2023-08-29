package goormknights.hotel.reservation.controller;

import goormknights.hotel.reservation.dto.ReservationDto;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.reservation.model.Reservation;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.item.repository.ItemRepository;
import goormknights.hotel.reservation.repository.ReservationRepository;
import goormknights.hotel.reservation.service.ReservationService;
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
