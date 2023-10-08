package goormknights.hotel.member.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ManagerListDTO {
    private Long id;
    private String adminName;
    private String adminId;
    private String adminNickname;
    private LocalDateTime createdAt;
    private Boolean isActive;
    private String password;
}
