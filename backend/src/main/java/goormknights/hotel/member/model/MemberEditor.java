package goormknights.hotel.member.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MemberEditor {
    private final String email;
    private final String memberId;
    private final String password;
    private final String name;
    private final String phoneNumber;
    private final LocalDate birth;
    private final String gender;
    private final String grade;


    @Builder
    public MemberEditor(String email, String memberId, String password, String name, String phoneNumber,
                        LocalDate birth, String gender, String grade) {
        this.email = email;
        this.memberId = memberId;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.birth = birth;
        this.gender = gender;
        this.grade = grade;
    }
}