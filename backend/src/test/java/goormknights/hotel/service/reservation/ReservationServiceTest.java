package goormknights.hotel.service.reservation;

import goormknights.hotel.dto.ReservationDto;
import goormknights.hotel.model.*;
import goormknights.hotel.repository.coupon.CouponRepository;
import goormknights.hotel.repository.giftcard.GiftCardRepository;
import goormknights.hotel.repository.item.ItemRepository;
import goormknights.hotel.repository.member.MemberRepository;
import goormknights.hotel.repository.reservation.ReservationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Commit//실제로 데이터를 넣어서 테스트한다.
class ReservationServiceTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private ReservationService reservationService;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private GiftCardRepository giftCardRepository;

    @Test
    @DisplayName("No coupon")
    void normalTest() {
        Member member = Member.builder()
                .email("test")
                .password("test")
                .name("test")
                .phoneNumber("010-0000-0000")
                .address("Earth")
                .privacyCheck(true)
                .grade("Bronze")
                .authority("ROLE_USER")
                .build();

        Item itemA = Item.builder()
                .price(10000)
                .name("ItemA")
                .build();

        ReservationDto reservationDto = ReservationDto.builder()
                .checkIn(LocalDateTime.now())
                .checkOut(LocalDateTime.now())
                .count(1)
                .notice("Hello")
                .price(itemA.getPrice())
                .stay(1)
                .build();

        Member saveMember = memberRepository.save(member);
        Item saveItem = itemRepository.save(itemA);
        int reservationID = reservationService.createReservation(saveMember.getId(), saveItem.getId(), reservationDto);
        Reservation reservation = reservationRepository.findById(reservationID).orElseThrow();
        System.out.println(reservation.getPrice());
    }

    @Test
    @DisplayName("use coupon")
    void useCouponTest() {
        Member member = Member.builder()
                .email("testB")
                .password("testB")
                .name("testB")
                .phoneNumber("010-0000-0000")
                .address("Earth")
                .privacyCheck(true)
                .grade("Gold")
                .authority("ROLE_USER")
                .build();

        Item itemA = Item.builder()
                .price(20000)
                .name("ItemA")
                .build();

        ReservationDto reservationDto = ReservationDto.builder()
                .checkIn(LocalDateTime.now())
                .checkOut(LocalDateTime.now())
                .count(1)
                .notice("Hello")
                .price(itemA.getPrice())
                .stay(1)
                .build();

        Coupon coupon = new Coupon(UUID.randomUUID().toString(), member);

        Member saveMember = memberRepository.save(member);
        Item saveItem = itemRepository.save(itemA);
        Coupon saveCoupon = couponRepository.save(coupon);
        int reservationID = reservationService.createReservation(saveMember.getId(), saveItem.getId(), saveCoupon.getId(), reservationDto);
        Reservation reservation = reservationRepository.findById(reservationID).orElseThrow();
        System.out.println(reservation.getPrice());
    }

    @Test
    @DisplayName("already Use coupon")
    void alreadyUseCouponTest() {
        Member member = Member.builder()
                .email("testB")
                .password("testB")
                .name("testB")
                .phoneNumber("010-0000-0000")
                .address("Earth")
                .privacyCheck(true)
                .grade("Gold")
                .authority("ROLE_USER")
                .build();

        Item itemA = Item.builder()
                .price(20000)
                .name("ItemA")
                .build();

        ReservationDto reservationDto = ReservationDto.builder()
                .checkIn(LocalDateTime.now())
                .checkOut(LocalDateTime.now())
                .count(1)
                .notice("Hello")
                .price(itemA.getPrice())
                .stay(1)
                .build();

        Coupon coupon = new Coupon(UUID.randomUUID().toString(), member);
        coupon.setIsUsed('Y');

        Member saveMember = memberRepository.save(member);
        Item saveItem = itemRepository.save(itemA);
        Coupon saveCoupon = couponRepository.save(coupon);
        int reservationID = reservationService.createReservation(saveMember.getId(), saveItem.getId(), saveCoupon.getId(), reservationDto);
        Reservation reservation = reservationRepository.findById(reservationID).orElseThrow();
        System.out.println(reservation.getPrice());
    }

    @Test
    @DisplayName("use giftcard")
    void useGiftCardTest() {
        Member member = Member.builder()
                .email("testB")
                .password("testB")
                .name("testB")
                .phoneNumber("010-0000-0000")
                .address("Earth")
                .privacyCheck(true)
                .grade("Gold")
                .authority("ROLE_USER")
                .build();

        Item itemA = Item.builder()
                .price(20000)
                .name("ItemA")
                .build();

        ReservationDto reservationDto = ReservationDto.builder()
                .checkIn(LocalDateTime.now())
                .checkOut(LocalDateTime.now())
                .count(1)
                .notice("Hello")
                .price(itemA.getPrice())
                .stay(1)
                .build();

        GiftCard giftCard = new GiftCard(UUID.randomUUID().toString(), 10000);

        Member saveMember = memberRepository.save(member);
        Item saveItem = itemRepository.save(itemA);
        GiftCard saveGiftCard = giftCardRepository.save(giftCard);
        int reservationID = reservationService.createReservation_UseGiftCard(saveMember.getId(), saveItem.getId(), saveGiftCard.getId(), reservationDto);
        Reservation reservation = reservationRepository.findById(reservationID).orElseThrow();
        GiftCard card = giftCardRepository.findById(saveItem.getId()).orElseThrow();
        System.out.println(reservation.getPrice());
        System.out.println("상품권 잔액 : "+card.getMoney());
    }

    @Test
    @DisplayName("use giftcard have many Money")
    void useGiftCard_Money_Exist_Test() {
        Member member = Member.builder()
                .email("testB")
                .password("testB")
                .name("testB")
                .phoneNumber("010-0000-0000")
                .address("Earth")
                .privacyCheck(true)
                .grade("Gold")
                .authority("ROLE_USER")
                .build();

        Item itemA = Item.builder()
                .price(20000)
                .name("ItemA")
                .build();

        ReservationDto reservationDto = ReservationDto.builder()
                .checkIn(LocalDateTime.now())
                .checkOut(LocalDateTime.now())
                .count(1)
                .notice("Hello")
                .price(itemA.getPrice())
                .stay(1)
                .build();

        GiftCard giftCard = new GiftCard(UUID.randomUUID().toString(), 50000);

        Member saveMember = memberRepository.save(member);
        Item saveItem = itemRepository.save(itemA);
        GiftCard saveGiftCard = giftCardRepository.save(giftCard);
        int reservationID = reservationService.createReservation_UseGiftCard(saveMember.getId(), saveItem.getId(), saveGiftCard.getId(), reservationDto);
        Reservation reservation = reservationRepository.findById(reservationID).orElseThrow();
        System.out.println(reservation.getPrice());
        System.out.println(giftCard.getMoney());
    }
}