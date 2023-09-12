package goormknights.hotel.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FindMemberIdRequest {
    private String name;
    private String email;
    private String code;
}