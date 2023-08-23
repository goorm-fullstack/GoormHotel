package goormknights.hotel.service;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class Signup {
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private String address;
    private Boolean privacyCheck;
    private LocalDate birth;
    private String gender;
}
