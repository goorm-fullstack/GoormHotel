package goormknights.hotel.reservation.service;

import goormknights.hotel.coupon.exception.AlreadyUsedException;
import goormknights.hotel.coupon.model.Coupon;
import goormknights.hotel.coupon.repository.CouponRepository;
import goormknights.hotel.giftcard.exception.GiftCardAlreadyUsedException;
import goormknights.hotel.giftcard.exception.NoSuchGiftCardException;
import goormknights.hotel.giftcard.model.GiftCard;
import goormknights.hotel.giftcard.repository.GiftCardRepository;
import goormknights.hotel.item.exception.NotExistItemException;
import goormknights.hotel.item.model.Item;
import goormknights.hotel.item.repository.ItemRepository;
import goormknights.hotel.member.dto.request.AnonymousSignupDto;
import goormknights.hotel.member.model.Anonymous;
import goormknights.hotel.member.model.Member;
import goormknights.hotel.member.repository.AnonymousRepository;
import goormknights.hotel.member.repository.MemberRepository;
import goormknights.hotel.reservation.dto.request.RequestReservationDto;
import goormknights.hotel.reservation.dto.request.UpdateReservationDto;
import goormknights.hotel.reservation.dto.response.MemberReservationDto;
import goormknights.hotel.reservation.dto.response.ResponseReservationDto;
import goormknights.hotel.reservation.exception.LimitExceededException;
import goormknights.hotel.reservation.model.Reservation;
import goormknights.hotel.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
    private final ItemRepository<Item> itemRepository;
    private final CouponRepository couponRepository;
    private final GiftCardRepository giftCardRepository;

    /**
     * 예약 정보 저장
     * @param reservationDto - user 입력한 정보
     */
    public void saveReservation(RequestReservationDto reservationDto) {

        Reservation reservation =  reservationDto.toEntity();
        reservation.setReservationNumber(makeReservationNumber()); // 예약 번호 생성

        setItemInfo(reservationDto, reservation); // 상품 정보 세팅
        setMemberInfo(reservationDto, reservation); // 회원/비회원 정보 세팅

        // 상품권 세팅
        if(reservationDto.getGiftCardId() != null) setGiftCardInfo(reservationDto, reservation);

        // 쿠폰 세팅
        if(reservationDto.getCouponId() != null){
            Optional<Coupon> useCoupon = couponRepository.findById(reservationDto.getCouponId());
            if(useCoupon.isEmpty() || useCoupon.get().getIsUsed() != 'N') {
                throw new AlreadyUsedException("이미 사용했거나 사용할 수 없는 쿠폰입니다.");
            }
            reservation.setCoupon(useCoupon.get());
        }

        reservationRepository.save(reservation); // 저장
    }

    /**
     * 상품권 정보 검증 및 세팅
     * @param reservationDto 예약자 입력 정보
     */
    private void setGiftCardInfo(RequestReservationDto reservationDto, Reservation reservation) {
        List<GiftCard> useGiftCard = new ArrayList<>();
        for(String s : reservationDto.getGiftCardId()) {
            GiftCard useGiftCardItem = giftCardRepository.findByUuid(s).orElseThrow(() -> new NoSuchGiftCardException("일치하는 상품권이 없습니다."));
            if(useGiftCardItem.getIsZeroMoney() != 'N') throw new GiftCardAlreadyUsedException("이미 사용한 상품권입니다.");
            useGiftCardItem.paidByGiftCard(useGiftCardItem.getMoney());
            useGiftCard.add(useGiftCardItem);
        }
        reservation.setGiftCard(useGiftCard);
    }

    /**
     * 예약 상품 정보 검증
     * @param reservationDto 예약자 입력 정보
     */
    private void setItemInfo(RequestReservationDto reservationDto, Reservation reservation) {
        Item item = itemRepository.findById(reservationDto.getItemId()).orElseThrow(() -> new NotExistItemException("해당 id의 상품을 찾을 수 없습니다. id = " + reservationDto.getItemId()));

        if (item.getSpare() < reservationDto.getCount())
            throw new LimitExceededException("잔여 수량보다 초과 입력하였습니다. 잔여 수 : " + item.getSpare() + ", 입력 수 : " + reservationDto.getCount());

        if (item.getSpareAdult() < reservationDto.getAdult() || item.getSpareChildren() < reservationDto.getChildren())
            throw new LimitExceededException("최대 숙박 인원을 초과하였습니다.");
        reservation.setItem(item);
    }

    /**
     * 회원 유무 체크 및 예약자 정보 세팅
     * @param reservationDto 예약자 입력 정보
     */
    private void setMemberInfo(RequestReservationDto reservationDto, Reservation reservation) {
        Optional<Member> isMember = memberRepository.findByMemberId(reservationDto.getMemberId());
        if (isMember.isEmpty()) {
            Anonymous anonymous = saveAnonymous(reservationDto, reservation);
            reservation.setNonMember(anonymous);
        } else {
            Member member = isMember.get();
            reservation.setMember(member);
        }
    }

    /**
     * 비회원 정보 저장
     * @param reservationDto 예약자 입력 정보
     * @return anonymous
     */
    private Anonymous saveAnonymous(RequestReservationDto reservationDto, Reservation reservation) {
        AnonymousSignupDto nonMember = new AnonymousSignupDto();
        nonMember.setName(reservationDto.getMemberName());
        nonMember.setEmail(reservationDto.getEmail());
        nonMember.setPhoneNumber(reservationDto.getPhoneNumber());
        Anonymous anonymous = anonymousRepository.save(nonMember.toEntity());
        anonymous.setReservationNumber(reservation.getReservationNumber());
        return anonymous;
    }

    /**
     * 예약 번호 생성
     * @return reservationNumber - 예약 번호: 예약 날짜(yyyyMMdd)+랜덤 문자 8자리
     */
    private String makeReservationNumber() {
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        String reservationNumber;
        int randomNumber = (int) (Math.random() * 89999999) + 10000000;
        reservationNumber = format.format(now) + randomNumber;
        log.info("예약번호" + reservationNumber);
        return reservationNumber;
    }

    /**
     * 예약 취소
     */
    public void cancleReservation(String reservationNumber) {
        Reservation reservation = reservationRepository.findByReservationNumber(reservationNumber).orElse(null);
        if (reservation != null && reservation.getState().equals("예약")) {
            reservation.setState("취소"); // 예약 상태 업데이트
            reservationRepository.save(reservation);
        }
    }

    /**
     * 관리자 -> 예약 정보 수정
     */
    public void updateReservationInfo(UpdateReservationDto reservationDto, String reservationNumber) {
        Reservation reservation = reservationRepository.findByReservationNumber(reservationNumber).orElse(null);
        if (reservation != null) {
            reservation.setNotice(reservationDto.getNotice()); // 요청사항 업데이트
            reservationRepository.save(reservation);
        }
    }

    /**
     * 전체 예약 조회
     * @return 전체 예약 결과 반환
     */
    public List<ResponseReservationDto> getAllReservation(Pageable pageable) {
        Page<Reservation> page = reservationRepository.findAll(pageable);
        List<ResponseReservationDto> result = new ArrayList<>();
        for(Reservation reservation : page) {
            result.add(reservation.toResponseReservationDto());
        }
        return result;
    }

    /**
     * 예약 번호로 예약 조회
     * @param reservationNumber - 예약번호
     * @return 입력한 예약 번호에 해당하는 예약 건 하나 반환
     */
    public Optional<Reservation> getReservationByNumber(String reservationNumber) {
        return reservationRepository.findByReservationNumber(reservationNumber);
    }

    /**
     * memberId로 예약 조회
     * @param memberId - 회원 ID
     * @return 해당 member 예약한 예약 건 모두 반환
     */
    public Optional<Reservation> getReservationByMemberId(String memberId) {
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

    public Long getCount() {
        return reservationRepository.count() / 10;
    }

    /**
     * FrontEnd ReservationList의 Reservation명세에 맞춰서 Dto 설게 완료
     */
    public List<MemberReservationDto> getReservationListByMemberId(String memberId, Pageable pageable) {
        Page<Reservation> page = reservationRepository.findAll(pageable);
        List<MemberReservationDto> result = new ArrayList<>();
        for(Reservation reservation : page) {
            result.add(new MemberReservationDto(reservation));
        }
        return result;
    }

    /**
     * 멤버 아이디로 데이터를 검색 후에 총 개수를 세어줍니다.
     */
    public Long getCountByMemberId(String memberId) {
        List<Reservation> byMemberID = reservationRepository.findAllByMemberId(memberId);
        return (long) (byMemberID.size() / 10);
    }
}
