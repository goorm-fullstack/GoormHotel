package goormknights.hotel.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminSignup {
    private String adminId;
    private String password;
    private String adminName;
    private String adminNickname;
    private String auth;
    private Boolean isActive;
}