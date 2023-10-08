package goormknights.hotel.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FindMemberIdDTO {
    private String name;
    private String email;
    private String code;
}