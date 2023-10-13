package goormknights.hotel.email.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmailNameIdDTO {
    private String memberId;
    private String name;
    private String email;
}
