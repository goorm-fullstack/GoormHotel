package goormknights.hotel.member.model;

import goormknights.hotel.global.entity.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Manager implements UserDetails, Serializable {
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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> authorities;

    @Enumerated(EnumType.STRING)
    private Role role = Role.MANAGER;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (String authority : authorities) {
            grantedAuthorities.add(new SimpleGrantedAuthority(authority));
        }
        return grantedAuthorities;
    }

    @Builder
    public Manager(String adminId, String adminName, String password, String adminNickname, Boolean isActive,
                   Role role, LocalDateTime createdAt, LocalDateTime updatedAt, List<String> authorities){
        this.adminId = adminId;
        this.adminName = adminName;
        this.password = password;
        this.role = role;
        this.isActive = isActive;
        this.adminNickname = adminNickname;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.authorities = authorities;
    }

    @Override
    public String getUsername() {
        return adminId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}