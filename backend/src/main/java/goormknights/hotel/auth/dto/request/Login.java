package goormknights.hotel.auth.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Login {

    private String memberId;
    private String password;

}