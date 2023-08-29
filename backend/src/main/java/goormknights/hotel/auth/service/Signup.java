package goormknights.hotel.auth.service;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class Signup {
    private String email;
    private String memberId;
    private String password;
    private String name;
    private String phoneNumber;
    private String address;
    private String grade;
    private Boolean privacyCheck;
    private LocalDate birth;
    private String gender;
    private String code;
}
