package goormknights.hotel.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindPasswordDTO {
    private String memberId;
    private String name;
    private String email;
    private String code;
}