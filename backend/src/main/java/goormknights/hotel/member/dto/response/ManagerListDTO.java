package goormknights.hotel.member.dto.response;

import goormknights.hotel.member.model.Manager;
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

    public ManagerListDTO(Manager manager) {
        this.id = manager.getId();
        this.adminName = manager.getAdminName();
        this.adminId = manager.getAdminId();
        this.adminNickname = manager.getAdminNickname();
        this.createdAt = manager.getCreatedAt();
        this.isActive = manager.getIsActive();
        this.password = manager.getPassword();
    }
}
