package goormknights.hotel.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnonymousDto {
    private String reservationNumber;
    private String phoneNumber;
}
