package goormknights.hotel.member.dto.request;

import goormknights.hotel.global.entity.Auth;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminSignup {
    private String adminId;
    private String password;
    private String adminName;
    private String adminNickname;
    private Set<Auth> auth;
    private Boolean isActive;
}