package goormknights.hotel.global.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    USER("ROLE_USER", "회원"),
    GUEST("ROLE_GUEST", "비회원"),
    MANAGER("ROLE_MANAGER", "매니저"),
    ADMIN("ROLE_ADMIN", "어드민");

    private final String key;
    private final String title;

}
