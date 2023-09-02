package goormknights.hotel.reservation;

import goormknights.hotel.item.dto.request.RequestImageDto;
import goormknights.hotel.item.model.Room;
import goormknights.hotel.item.service.RoomService;
import goormknights.hotel.item.dto.request.RequestRoomDto;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.MemberRepository;
import goormknights.hotel.reservation.dto.request.RequestReservationDto;
import goormknights.hotel.reservation.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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
    private RoomService roomService;

    private LocalDateTime now = LocalDateTime.now();
    private LocalDateTime future = now.plusDays(3);

    /**
     * 예약 기능 테스트
     */
    @Test
    public void reservationTest() {

        RequestRoomDto buildRoom = RequestRoomDto.builder()
                .bed("single")
                .spareChildren(3)
                .spareAdult(5)
                .priceChildren(10000)
                .spare(3)
                .type("room")
                .price(1350000)
                .name("grand Room")
                .typeDetail("VIPRoom")
                .priceAdult(50000)
                .capacity(10)
                .build();
        RequestImageDto requestImageDTO = RequestImageDto.builder()
                .originFileName("hello")
                .fileName("hi")
                .filePath("here")
                .build();


        roomService.saveRoom(buildRoom, requestImageDTO);
        Room findRoom = roomService.findByRoomName(buildRoom.getName());

        Member member = Member.builder()
                .id(null)
                .memberId("test")
                .password("password")
                .name("테스트")
                .auth("member")
                .phoneNumber("01012341234")
                .email("test@test.com")
                .address("주소")
                .privacyCheck(true)
                .gender("Gold")
                .couponList(null)
                .reservationList(null)
                .giftCardList(null)
                .gender("")
                .birth(null)
                .build();

        memberRepository.save(member);



        RequestReservationDto reservation = RequestReservationDto.builder()
                .id(7)
                .reservationNumber("2023090200000000")
                .orderDate(now)
                .checkIn(future)
                .checkOut(future)
                .count(1)
                .adult(1)
                .children(0)
                .member(member)
                .notice("없음")
                .item(findRoom)
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
