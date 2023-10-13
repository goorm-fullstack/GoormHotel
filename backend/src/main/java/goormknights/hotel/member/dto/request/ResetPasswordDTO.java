package goormknights.hotel.member.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {
    private String resetToken;
    private String newPassword;
}
