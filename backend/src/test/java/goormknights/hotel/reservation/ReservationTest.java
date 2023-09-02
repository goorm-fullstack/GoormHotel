package goormknights.hotel.reservation;

import goormknights.hotel.auth.model.Member;
import goormknights.hotel.auth.repository.MemberRepository;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.repository.ItemRepository;
import goormknights.hotel.reservation.dto.request.RequestReservationDto;
import goormknights.hotel.reservation.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.LocalDateTime;

@SpringBootTest
@Transactional
public class ReservationTest {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ItemRepository itemRepository;

    private LocalDateTime now = LocalDateTime.now();
    private LocalDateTime future = now.plusDays(3);
    private Date futureDate = Timestamp.valueOf(future);

    /**
     * 예약 기능 테스트
     */
    @Test
    public void reservationTest() {

        Member member = Member.builder()
                .id(null)
                .memberId("test")
                .name("테스트")
                .auth("member")
                .phoneNumber("01012341234")
                .email("test@test.com")
                .build();

        memberRepository.save(member);

        Item item = Item.builder()
                .id(null)
                .name("테스트 상품")
                .price(15000)
                .priceAdult(10000)
                .priceChildren(5000)
                .type("room")
                .typeDetail("d")
                .spare(5)
                .spareAdult(1)
                .spareChildren(2)
                .build();

        itemRepository.save(item);

        RequestReservationDto reservation = RequestReservationDto.builder()
                .id(7)
                .reservationNumber("2023090200000000")
                .orderDate(now)
                .checkIn(futureDate)
                .checkOut(futureDate)
                .count(1)
                .adult(1)
                .children(0)
                .member(member)
                .notice("없음")
                .item(item)
                .stay(1)
                .coupon(null)
                .giftCard(null)
                .sumPrice(165000)
                .discountPrice(-150000)
                .totalPrice(15000)
                .state("예약")
                .build();

        reservationService.saveReservation(reservation); // 예약 저장
        reservationService.getAllReservation(); // 전체 예약 목록 조회, 여기까지 테스트 완료(2023-09-02)

    }

    /**
     * 예약 번호 생성 테스트
     */
    @Test
    public void makeReservationNumber() {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        int randomNumber = (int)(Math.random() * 89999999) + 10000000;
        String reservationNumber = format.format(now) + randomNumber;
        System.out.println("예약번호" + reservationNumber);
    }

}
