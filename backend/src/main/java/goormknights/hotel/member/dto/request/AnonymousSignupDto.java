package goormknights.hotel.member.dto.request;

import goormknights.hotel.member.model.Anonymous;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnonymousSignupDto {
    private String name;
    private String email;
    private String phoneNumber;

    public Anonymous toEntity() {
        return Anonymous.builder()
                .name(name)
                .email(email)
                .phoneNumber(phoneNumber)
                .build();
    }
}
