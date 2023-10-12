package goormknights.hotel.member.dto.request;

import goormknights.hotel.global.entity.Role;
import goormknights.hotel.member.model.Manager;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestManagerDto {
    private Long id;
    private String adminId;
    private String password;
    private String adminName;
    private String adminNickname;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private String auth;
    private Role role;

    public RequestManagerDto(Manager manager) {
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
