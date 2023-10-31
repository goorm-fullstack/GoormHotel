package goormknights.hotel.reservation.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UpdateReservationDto {

        private String notice;              // 고객 요청사항: user 입력 사항

}
