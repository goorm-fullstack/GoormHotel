package goormknights.hotel.reservation.controller;

import goormknights.hotel.reservation.dto.request.RequestReservationDto;
import goormknights.hotel.reservation.dto.response.ResponseReservationDto;
import goormknights.hotel.reservation.service.ReservationService;
import goormknights.hotel.reservation.model.Reservation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
            @Validated @ModelAttribute RequestReservationDto reservationDto
    ) {
        reservationService.saveReservation(reservationDto);
        return ResponseEntity.ok().build();
    }

    /**
     * 예약 정보 업데이트: 예약 상태
     * @param reservationDto - 관리자가 수정한 예약 상태 내용
     * @return responseReservationDto
     */
    @PostMapping("/update/state")
    public ResponseEntity<ResponseReservationDto> updateReservationState(
            @Validated @ModelAttribute RequestReservationDto reservationDto
    ){
        reservationService.updateReservationState(reservationDto);
        ResponseReservationDto responseReservationDto
                = reservationService.getReservationById(reservationDto.getId())
                .orElseThrow().toResponseReservationDto();
        return ResponseEntity.ok(responseReservationDto);
    }

    /**
     * 예약 정보 업데이트: 요청사항
     * @param reservationDto - 관리자가 수정한 요청사항 내용
     * @return responseReservationDto
     */
    @PostMapping("/update/notice")
    public ResponseEntity<ResponseReservationDto> updateReservationNotice(
            @Validated @ModelAttribute RequestReservationDto reservationDto
    ){
        reservationService.updateReservationNotice(reservationDto);
        ResponseReservationDto responseReservationDto
                = reservationService.getReservationById(reservationDto.getId())
                .orElseThrow().toResponseReservationDto();
        return ResponseEntity.ok(responseReservationDto);
    }

    /**
     * 회원 memberId를 이용해 예약 건 조회
     * @param memberId - 회원 아이디
     * @return 해당 memberId를 가진 회원이 예약했던 내역
     */
    @GetMapping("/{memberId}")
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
     */
    @GetMapping("/{reservationNumber}")
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
    public ResponseEntity<Object> getAllReservation(){
        List<Reservation> list = reservationService.getAllReservation();
        List<ResponseReservationDto> dtoList = new ArrayList<>();

        for(Reservation r : list) {
            dtoList.add(r.toResponseReservationDto());
        }

        return ResponseEntity.ok(dtoList);
    }

}
