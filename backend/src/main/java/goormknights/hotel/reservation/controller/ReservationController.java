package goormknights.hotel.reservation.controller;

import goormknights.hotel.reservation.dto.request.RequestReservationDto;
import goormknights.hotel.reservation.dto.request.UpdateReservationDto;
import goormknights.hotel.reservation.dto.response.MemberReservationDto;
import goormknights.hotel.reservation.dto.response.ResponseReservationDto;
import goormknights.hotel.reservation.service.ReservationService;
import goormknights.hotel.reservation.model.Reservation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reservation")
@Slf4j
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * 새로운 예약 건 저장
     * @param reservationDto - user가 입력한 정보
     * @return ResponseEntity
     */
    @PostMapping("/save")
    public ResponseEntity<Object> saveReservation(
            @Validated @RequestBody RequestReservationDto reservationDto
    ) throws Throwable {
        reservationService.saveReservation(reservationDto);
        return ResponseEntity.ok().build();
    }

    /**
     * 예약 취소
     */
    @PostMapping("/cancle/{reservationNumber}")
    public ResponseEntity<Object> cancleReservation(
            @PathVariable String reservationNumber
    ){
        reservationService.cancleReservation(reservationNumber);
        return ResponseEntity.ok().build();
    }

    /**
     * 예약 정보 업데이트
     * @param reservationDto - 관리자가 수정한 요청사항 내용
     */
    @PostMapping("/update/{reservationNumber}")
    public ResponseEntity<Object> updateReservationNotice(
            @Validated @RequestBody UpdateReservationDto reservationDto, @PathVariable String reservationNumber
    ){
        reservationService.updateReservationInfo(reservationDto, reservationNumber);
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 memberId를 이용해 예약 건 조회
     * @param memberId - 회원 아이디
     * @return 해당 memberId를 가진 회원이 예약했던 내역
     */
    @GetMapping("/list/{memberId}")
    public ResponseEntity<ResponseReservationDto> getReservationByMemberId(@PathVariable String memberId){
        ResponseReservationDto responseReservationDto
                = reservationService.getReservationByMemberId(memberId)
                .orElseThrow().toResponseReservationDto();
        return ResponseEntity.ok(responseReservationDto);
    }

    /**
     * 예약 번호를 이용해 예약 건 조회
     * @param reservationNumber - 예약 번호
     * @return 해당 예약 번호를 가진 예약 내역
     * 2023.09.17 일부 수정 -> 동일한 위치에서 @PathVariable를 사용하면 모호성으로 오류가 발생합니다.
     */
    @GetMapping("/detail/{reservationNumber}")
    public ResponseEntity<ResponseReservationDto> getReservationByNumber(@PathVariable String reservationNumber){
        ResponseReservationDto responseReservationDto
                = reservationService.getReservationByNumber(reservationNumber)
                .orElseThrow().toResponseReservationDto();
        return ResponseEntity.ok(responseReservationDto);
    }

    /**
     * 전체 예약 조회
     * @return 전체 예약 내역
     */
    @GetMapping
    public ResponseEntity<List<ResponseReservationDto>> getAllReservation(@PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(reservationService.getAllReservation(pageable));
    }

    /**
     * 예약데이터 페이징 개수 세기
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getCount() {
        return ResponseEntity.ok(reservationService.getCount());
    }

    /**
     * 멤버 아이디로 예약 조회
     */
    @GetMapping("/list/member/{memberId}")
    public ResponseEntity<List<MemberReservationDto>> getReservationListByMemberId(
            @PathVariable String memberId,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(reservationService.getReservationListByMemberId(memberId, pageable));
    }

    @GetMapping("/list/count/{memberId}")
    public ResponseEntity<Long> getReservationListCountByMemberId(
            @PathVariable String memberId
    ) {
        return ResponseEntity.ok(reservationService.getCountByMemberId(memberId));
    }
}
