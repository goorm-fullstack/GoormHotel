package goormknights.hotel.global.entity;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Auth {

    A("AUTH_A", "회원관리"),
    B("AUTH_B", "상품 및 예약 관리"),
    C("AUTH_C", "사이트 관리");

    private final String key;
    private final String title;

    @JsonValue
    public String getKey() {
        return key;
    }
}
