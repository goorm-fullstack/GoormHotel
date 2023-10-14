package goormknights.hotel.reservation.service;

import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.dto.request.AnonymousSignupDto;
import goormknights.hotel.member.exception.MemberNotFound;
import goormknights.hotel.member.model.Anonymous;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.AnonymousRepository;
import goormknights.hotel.member.repository.MemberRepository;
import goormknights.hotel.reservation.dto.request.RequestAnonymousReservationDto;
import goormknights.hotel.reservation.dto.request.RequestReservationDto;
import goormknights.hotel.reservation.model.Reservation;
import goormknights.hotel.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final AnonymousRepository anonymousRepository;
    /**
     * 예약 정보 저장
     *
     * @param reservationDto - user가 입력한 정보
     * @param memberId
     */
    public void saveReservation(RequestReservationDto reservationDto, long memberId) {
        Optional<Member> customer = memberRepository.findById(memberId);
        if(customer.isEmpty()) {
            throw new MemberNotFound();
        }


        String generatedNumber = makeReservationNumber();
        Member member = customer.get();
        reservationDto.setMember(member);
        reservationDto.setReservationNumber(generatedNumber);
        Reservation saveReservation = reservationRepository.save(reservationDto.toEntity());
        saveReservation.getMember().getReservationList().add(saveReservation);
        List<GiftCard> giftCards = saveReservation.getGiftCard();
        for(GiftCard giftCard : giftCards) {
            giftCard.setReservation(saveReservation);
        }
    }

    /**
     * 비회원 예약하기 로직
     */
    public void saveReservation_Anonymous(RequestAnonymousReservationDto reservationDto) {
        Anonymous anonymous = anonymousRepository.save(reservationDto.getAnonymousSignupDto().toEntity());
        String generatedNumber = makeReservationNumber();
        anonymous.setReservationNumber(generatedNumber);
        reservationDto.setReservationNumber(generatedNumber);
        Reservation saveReservation = reservationRepository.save(reservationDto.toEntity());
        List<GiftCard> giftCards = saveReservation.getGiftCard();
        for(GiftCard giftCard : giftCards) {
            giftCard.setReservation(saveReservation);
        }
    }

    /**
     * 예약 번호 생성
     * @return reservationNumber - 예약 번호: 예약 날짜(yyyyMMdd)+랜덤 문자 8자리
     */
    private String makeReservationNumber() {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String reservationNumber;
        int randomNumber = (int)(Math.random() * 89999999) + 10000000;
        reservationNumber = format.format(now) + randomNumber;
        log.info("예약번호" + reservationNumber);
        return reservationNumber;
    }

    /**
     * 관리자 -> 예약 정보 수정: 예약 상태
     * @param reservationDto - 관리자가 수정한 정보
     */
    public void updateReservationState(RequestReservationDto reservationDto) {
        Reservation reservation = reservationRepository.findById(reservationDto.getId()).orElse(null);
        if (reservation != null) {
            reservation.setState(reservationDto.getState()); // 예약 상태 업데이트
            reservationRepository.save(reservation);
        }
    }

    /**
     * 관리자 -> 예약 정보 수정: 요청사항
     * @param reservationDto - 관리자가 수정한 정보
     */
    public void updateReservationNotice(RequestReservationDto reservationDto){
        Reservation reservation = reservationRepository.findById(reservationDto.getId()).orElse(null);
        if (reservation != null) {
            reservation.setNotice(reservationDto.getNotice()); // 요청사항 업데이트
            reservationRepository.save(reservation);
        }
    }

    /**
     * 전체 예약 조회
     * @return 전체 예약 결과 반환
     */
    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    /**
     * 예약 번호로 예약 조회
     * @param reservationNumber - 예약번호
     * @return 입력한 예약 번호에 해당하는 예약 건 하나 반환
     */
    public Optional<Reservation> getReservationByNumber(String reservationNumber){
        return reservationRepository.findByReservationNumber(reservationNumber);
    }

    /**
     * memberId로 예약 조회
     * @param memberId - 회원 ID
     * @return 해당 member가 예약한 예약 건 모두 반환
     */
    public Optional<Reservation> getReservationByMemberId(String memberId){
        return reservationRepository.findByMemberId(memberId);
    }

    /**
     * ID(PK) 값으로 예약 조회
     * @param id - 인덱스 번호(PK)
     * @return 해당 id 값과 일치하는 예약 건 반환
     */
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

}
