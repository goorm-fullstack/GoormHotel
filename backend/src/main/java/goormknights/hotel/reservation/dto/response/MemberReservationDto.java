package goormknights.hotel.reservation.dto.response;

import goormknights.hotel.reservation.model.Reservation;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberReservationDto {
    private Long id;                    // 인덱스 번호(PK)
    private String reservationNumber;   // 예약 번호: 날짜 + 랜덤 숫자 조합
    private String productName;
    private LocalDateTime checkInDate;               // 체크인 날짜
    private LocalDateTime checkOutDate;              // 체크아웃 날짜
    private LocalDateTime reservationDate;    // 예약 시점 정보: 예약한 날짜, 시간 정보
    private Integer paymentAmount;             // 최종 결제 금액(VAT 포함)

    public MemberReservationDto(Reservation reservation) {
        this.id = reservation.getId();
        this.reservationNumber = reservation.getReservationNumber();
        this.productName = reservation.getItem().getName();
        this.checkInDate = reservation.getCheckIn();
        this.checkOutDate = reservation.getCheckOut();
        this.reservationDate = reservation.getOrderDate();
        this.paymentAmount = reservation.getTotalPrice();
    }
}
