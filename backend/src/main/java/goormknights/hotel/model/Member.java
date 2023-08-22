package goormknights.hotel.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Getter
@Builder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String address;

    private boolean privacyCheck;

    private String grade;//Bronze, Silver, Gold, VIP
    private String authority;//ROLE_ANONYMOUS, ROLE_MEMBER,ROLE_ADMIN

    @Nullable
    private String gender;
    @Nullable
    private LocalDateTime birth;
}
