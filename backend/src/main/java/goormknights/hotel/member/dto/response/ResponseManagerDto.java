package goormknights.hotel.member.dto.response;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.model.Manager;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Data
public class ResponseManagerDto {
    private Long id;
    private String adminId;
    private String password;
    private String adminName;
    private String adminNickname;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private String auth;
    private Role role;

    public ResponseManagerDto(Manager manager) {
        this.id = manager.getId();
        this.adminId = manager.getAdminId();
        this.password = manager.getPassword();
        this.adminName = manager.getAdminName();
        this.adminNickname = manager.getAdminNickname();
        this.isActive = manager.getIsActive();
        this.createdAt = manager.getCreatedAt();
        this.auth = manager.getAuth();
        this.role = manager.getRole();
    }
}
