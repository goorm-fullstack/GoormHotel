package goormknights.hotel.auth.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManagerLogin {

    private String adminId;
    private String password;

}