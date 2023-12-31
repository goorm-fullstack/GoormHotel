package goormknights.hotel.member.model;

import goormknights.hotel.global.entity.Role;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Manager implements Serializable {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private String adminId;

    private String password;

    private String adminName;

    private String adminNickname;

    private Boolean isActive;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String auth;

    @Enumerated(EnumType.STRING)
    private Role role = Role.MANAGER;

    @Builder
    public Manager(String adminId, String adminName, String password, String adminNickname, Boolean isActive,
                   Role role, LocalDateTime createdAt, LocalDateTime updatedAt, String auth){
        this.adminId = adminId;
        this.adminName = adminName;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
        this.adminNickname = adminNickname;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.auth = auth;
    }
}